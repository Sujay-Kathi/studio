/**
 * IMPORTANT: This file contains placeholder code and requires manual setup in Google Cloud to work.
 *
 * This Cloud Function is designed to sync data from your Firestore 'residents' collection
 * to a Google Sheet. It will trigger on any create, update, or delete operation in Firestore.
 *
 * Follow the setup guide provided by the AI assistant to complete the integration.
 */
import * as functions from 'firebase-functions';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// TODO: Step 1 - Paste your Google Sheet ID here.
// You can find this in the URL of your Google Sheet.
// (e.g., https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit)
const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

// TODO: Step 2 - Set up a Service Account in Google Cloud.
// 1. Go to the Google Cloud Console -> IAM & Admin -> Service Accounts.
// 2. Create a new service account.
// 3. Download the JSON key file for this service account.
// 4. Copy the `client_email` and `private_key` from the JSON file into your Firebase environment variables.
//    - firebase functions:config:set google.client_email="your-service-account-email@...com"
//    - firebase functions:config:set google.private_key="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
// 5. Share your Google Sheet with the service account's email address and give it "Editor" permissions.

const getGoogleAuth = () => {
  try {
    const { client_email, private_key } = functions.config().google;
    if (!client_email || !private_key) {
      console.error('Missing Google service account credentials in Firebase config. Run `firebase functions:config:set google.client_email="..." google.private_key="..."`');
      return null;
    }

    return new JWT({
      email: client_email,
      key: private_key.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  } catch (e) {
      console.error('Error reading google config. Make sure you have set the environment variables correctly using `firebase functions:config:set google.client_email="..." google.private_key="..."`');
      return null;
  }
};

const getSheetsClient = async () => {
  const auth = getGoogleAuth();
  if (!auth) return null;
  
  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
};

// This function triggers whenever a document in the 'residents' collection is written to.
export const syncResidentsToSheet = functions.firestore
  .document('residents/{residentId}')
  .onWrite(async (change, context) => {
    const sheets = await getSheetsClient();
    if (!sheets || SPREADSHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
      console.log('Google Sheets client not initialized or SPREADSHEET_ID not set. Aborting sync.');
      return null;
    }

    const { residentId } = context.params;

    // If the document was deleted, we'll clear the row.
    // A more advanced implementation might delete the row.
    if (!change.after.exists) {
      // For simplicity, we're not deleting rows, but you could implement this.
      console.log(`Resident ${residentId} deleted. No action taken in sheet.`);
      return null;
    }

    const residentData = change.after.data();
    if (!residentData) {
      console.log('No data found for resident. Aborting sync.');
      return null;
    }

    // This assumes your sheet has headers: id, name, flatNo, phone
    const headers = ['id', 'name', 'flatNo', 'phone'];
    const values = [
        // Ensure id is always included and is the residentId
        [
            residentId,
            residentData['name'] || '',
            residentData['flatNo'] || '',
            residentData['phone'] || ''
        ]
    ];


    try {
      // First, try to find if the resident already exists in the sheet.
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'A:A', // Look for the ID in the first column
      });

      const rows = response.data.values || [];
      let rowIndex = -1;

      // Find the row index for the residentId
      if (rows.length > 0) {
          rowIndex = rows.findIndex(row => row[0] === residentId);
      }


      let range;
      if (rowIndex !== -1) {
        // Resident found, update the row
        range = `A${rowIndex + 1}`;
        console.log(`Updating resident ${residentId} at row ${rowIndex + 1}`);
         await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: values,
            },
          });
      } else {
        // Resident not found, append a new row
        console.log(`Appending new resident ${residentId}`);
         await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A1', // Append after the last row with data
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: values,
            },
        });
      }

      console.log('Successfully synced data to Google Sheet.');
    } catch (error) {
      console.error('Error syncing data to Google Sheet:', error);
    }

    return null;
  });
