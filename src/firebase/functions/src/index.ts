/**
 * This file contains the Cloud Function that syncs Firestore resident data to a Google Sheet.
 *
 * IMPORTANT: Before deploying, you must set the following environment variables in your Firebase project:
 * 1. GOOGLE_SHEET_ID: The ID of the Google Sheet you want to write to.
 * 2. GOOGLE_SERVICE_ACCOUNT_EMAIL: The email of the service account with access to the sheet.
 * 3. GOOGLE_PRIVATE_KEY: The private key of the service account.
 *
 * You can set these using the Firebase CLI:
 * firebase functions:config:set google.sheet_id="YOUR_GOOGLE_SHEET_ID_HERE"
 * firebase functions:config:set google.client_email="your-service-account-email@your-project.iam.gserviceaccount.com"
 * firebase functions:config:set google.private_key="-----BEGIN PRIVATE KEY-----\n...your-private-key-content...\n-----END PRIVATE KEY-----\n"
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { google } from "googleapis";

// Initialize Firebase Admin SDK
admin.initializeApp();

const SPREADSHEET_ID = functions.config().google.sheet_id;
const SHEET_NAME = "Residents"; // The name of the sheet (tab) within your spreadsheet

const auth = new google.auth.GoogleAuth({
  // Scopes are the permissions we need to access the Google Sheet
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  // Get credentials from Firebase environment variables
  credentials: {
    client_email: functions.config().google.client_email,
    private_key: functions.config().google.private_key.replace(/\\n/g, "\n"),
  },
});

const sheets = google.sheets({ version: "v4", auth });

/**
 * Ensures the header row exists in the Google Sheet.
 */
async function ensureHeaderRow() {
  try {
    const headerRange = `${SHEET_NAME}!A1:D1`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: headerRange,
    });

    const values = response.data.values;
    if (!values || values.length === 0) {
      // Header is missing, so we write it
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: headerRange,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [["id", "name", "flatNo", "phone"]],
        },
      });
      functions.logger.log("Header row created.");
    }
  } catch (error) {
    functions.logger.error("Error ensuring header row:", error);
    // If the sheet doesn't exist, this might fail. The update function will create it.
    // So we can proceed.
  }
}

/**
 * Finds a row by ID (document ID) and returns its row number.
 * @param {string} id The document ID of the resident.
 * @return {Promise<number>} The row number (1-based) or -1 if not found.
 */
async function findRowById(id: string): Promise<number> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:A`, // Search in the ID column
    });

    const rows = response.data.values;
    if (rows) {
      const rowIndex = rows.findIndex((row) => row[0] === id);
      return rowIndex !== -1 ? rowIndex + 1 : -1;
    }
    return -1;
  } catch (error) {
    functions.logger.error("Error finding row by ID:", error);
    return -1;
  }
}


/**
 * Triggers when a document in the 'residents' collection is created.
 * It adds a new row to the Google Sheet.
 */
export const onResidentCreate = functions.firestore
  .document("residents/{residentId}")
  .onCreate(async (snap, context) => {
    const residentData = snap.data();
    const residentId = context.params.residentId;
    functions.logger.log(`New resident created: ${residentId}`, residentData);

    await ensureHeaderRow();

    // Idempotency Check: Ensure we don't add a user that already exists.
    const existingRow = await findRowById(residentId);
    if (existingRow !== -1) {
      functions.logger.warn(`Resident ID ${residentId} already exists in sheet at row ${existingRow}. Skipping creation.`);
      return; // Exit function to prevent duplicate entry
    }

    const values = [[
      residentId,
      residentData.name || "",
      residentData.flatNo || "",
      residentData.phone || "",
    ]];

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:D`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values,
        },
      });
      functions.logger.log("Successfully appended new resident to sheet.");
    } catch (error) {
      functions.logger.error("Error appending to sheet:", error);
    }
  });


/**
 * Triggers when a document in the 'residents' collection is updated.
 * It finds the corresponding row in the Google Sheet and updates it.
 */
export const onResidentUpdate = functions.firestore
  .document("residents/{residentId}")
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const residentId = context.params.residentId;
    functions.logger.log(`Resident updated: ${residentId}`, newData);

    await ensureHeaderRow();
    const rowNumber = await findRowById(residentId);

    if (rowNumber === -1) {
      functions.logger.warn(`Resident ID ${residentId} not found in sheet. Appending instead.`);
      // If not found, append a new row as a fallback
      const values = [[
        residentId,
        newData.name || "",
        newData.flatNo || "",
        newData.phone || "",
      ]];
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:D`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });
      return;
    }

    const range = `${SHEET_NAME}!A${rowNumber}:D${rowNumber}`;
    const values = [[
      residentId, // Keep the ID the same
      newData.name || "",
      newData.flatNo || "",
      newData.phone || "",
    ]];

    try {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values,
        },
      });
      functions.logger.log(`Successfully updated row ${rowNumber} in sheet.`);
    } catch (error) {
      functions.logger.error(`Error updating row ${rowNumber} in sheet:`, error);
    }
  });
