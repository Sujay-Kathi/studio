'use server';
import { revalidatePath } from 'next/cache';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/firebase/config';
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

    const updatedResident = { ...currentResidents[residentIndex], ...data };
    const updatedResidents = [...currentResidents];
    updatedResidents[residentIndex] = updatedResident;

    const residentsString = `let residents: Resident[] = ${JSON.stringify(updatedResidents, null, 2)};`;
    const dataPath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
    let fileContent = await fs.readFile(dataPath, 'utf8');
    fileContent = fileContent.replace(/let residents: Resident\[\] = \[[\s\S]*?\];/, residentsString);
    await fs.writeFile(dataPath, fileContent, 'utf8');

    revalidatePath('/profile/edit');
    return { success: true };
  } catch (error: any) {
    console.error("Error updating resident in file: ", error);
    return { success: false, error: error.message };
  }
}

export async function addEvent(eventData: Omit<Event, 'id' | 'image' | 'imageHint' | 'participants'>) {
  try {
    const newEvent = {
      ...eventData,
      image: `https://picsum.photos/seed/${Math.random()}/800/600`,
      imageHint: 'new event',
      participants: 0,
    };
    const docRef = await addDoc(collection(db, "events"), newEvent);
    return { success: true, eventId: docRef.id };
  } catch (error: any) {
    console.error("Error adding event to Firestore: ", error);
    return { success: false, error: error.message };
  }
}

export async function addAnnouncement(announcementData: Omit<Announcement, 'id'| 'date' | 'image' | 'imageHint'>) {
    try {
        const newAnnouncement = {
            ...announcementData,
            date: new Date().toISOString(),
            image: announcementData.image || `https://picsum.photos/seed/announcement-${Math.random()}/800/600`,
            imageHint: 'new announcement',
        };
        const docRef = await addDoc(collection(db, "announcements"), newAnnouncement);
        return { success: true, announcementId: docRef.id };
    } catch (error: any) {
        console.error("Error adding announcement to Firestore: ", error);
        return { success: false, error: error.message };
    }
}
