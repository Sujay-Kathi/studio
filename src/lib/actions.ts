'use server';
import { revalidatePath } from 'next/cache';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"; 
import { db } from '@/firebase/config';
import { getResidentByPhone } from './data';
import type { Resident, Event, Announcement } from './types';


export async function updateResident(id: string, data: Partial<{ name: string; flatNo: string; avatar?: string }>) {
  try {
    const residentDoc = doc(db, "residents", id);
    await updateDoc(residentDoc, data);
    revalidatePath('/profile/edit');
    return { success: true };
  } catch (error: any) {
    console.error("Error updating resident in Firestore: ", error);
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
