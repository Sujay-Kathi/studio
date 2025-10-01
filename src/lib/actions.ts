'use server';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { residents as currentResidents, getEvents, getAnnouncements, emergencyContacts, volunteerServices, getResidentByPhone } from './data';
import type { Resident, Event, Announcement } from './types';


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

export async function addEvent(eventData: Omit<Event, 'id' | 'image' | 'imageHint' | 'participants'>) {
    const newEvent: Event = {
      id: String(Date.now()),
      ...eventData,
      image: `https://picsum.photos/seed/${Math.random()}/800/600`,
      imageHint: 'new event',
      participants: 0,
    };
    //This is a mock implementation. In a real app, you would save this to a database.
    console.log('New event added:', newEvent);
    return { success: true, eventId: newEvent.id };
}

export async function addAnnouncement(announcementData: Omit<Announcement, 'id'| 'date' | 'image' | 'imageHint'>) {
    const newAnnouncement: Announcement = {
      id: String(Date.now()),
      ...announcementData,
      date: new Date().toISOString(),
      image: `https://picsum.photos/seed/announcement-${Math.random()}/800/600`,
      imageHint: 'new announcement',
    };
    //This is a mock implementation. In a real app, you would save this to a database.
    console.log('New announcement added:', newAnnouncement);
    return { success: true, announcementId: newAnnouncement.id };
}
