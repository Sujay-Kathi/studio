'use server';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { residents as currentResidents, getEvents, getAnnouncements, emergencyContacts, volunteerServices, getResidentByPhone } from './data';
import type { Resident } from './types';


export async function updateResident(id: string, data: Partial<{ name: string; flatNo: string; avatar?: string }>) {
  try {
    const residentIndex = currentResidents.findIndex(res => res.id === id);
    if (residentIndex === -1) {
      return { success: false, error: 'Resident not found' };
    }

    // Update the resident in the array
    const updatedResident = { ...currentResidents[residentIndex], ...data };
    const updatedResidents = [...currentResidents];
    updatedResidents[residentIndex] = updatedResident;

    // Format the updated residents array back into a string
    const residentsString = `let residents: Resident[] = ${JSON.stringify(updatedResidents, null, 2)};`;

    // Read the entire data.ts file
    const dataPath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
    let fileContent = await fs.readFile(dataPath, 'utf8');

    // Replace the old residents array with the new one
    fileContent = fileContent.replace(/let residents: Resident\[\] = \[[\s\S]*?\];/, residentsString);

    // Write the updated content back to the file
    await fs.writeFile(dataPath, fileContent, 'utf8');

    revalidatePath('/profile/edit');
    return { success: true };
  } catch (error: any) {
    console.error("Error updating resident in file: ", error);
    return { success: false, error: error.message };
  }
}
