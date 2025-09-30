'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/firebase/config';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import type { Event, Announcement } from './types';

// NOTE: This implementation now interacts with Firestore.

export async function addEvent(eventData: Omit<Event, 'id' | 'image' | 'imageHint' | 'participants'>) {
  try {
    const newEventData = {
      ...eventData,
      // Using a placeholder for the image for now
      image: `https://picsum.photos/seed/${Math.random()}/800/600`,
      imageHint: 'new event',
      participants: 0,
      priority: eventData.priority,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "events"), newEventData);
    
    revalidatePath('/events');
    revalidatePath('/home');
    return { success: true, eventId: docRef.id };
  } catch (error: any) {
    console.error("Error adding event: ", error);
    return { success: false, error: error.message };
  }
}

export async function addAnnouncement(announcementData: Omit<Announcement, 'id' | 'image' | 'imageHint' | 'date'>) {
    try {
        const newAnnouncementData = {
            ...announcementData,
            date: new Date().toISOString(),
            image: `https://picsum.photos/seed/announcement-${Math.random()}/800/600`,
            imageHint: 'new announcement',
        };
        const docRef = await addDoc(collection(db, "announcements"), newAnnouncementData);
        
        revalidatePath('/announcements');
        revalidatePath('/home');
        return { success: true, announcementId: docRef.id };
    } catch (error: any) {
        console.error("Error adding announcement: ", error);
        return { success: false, error: error.message };
    }
}


export async function updateResident(id: string, data: Partial<{ name: string; flatNo: string; avatar?: string }>) {
  try {
    const residentDoc = doc(db, 'residents', id);
    await updateDoc(residentDoc, data);
    revalidatePath(`/profile/edit`); // Revalidate if needed, though this is a client page
    return { success: true };
  } catch (error: any) {
    console.error("Error updating resident: ", error);
    return { success: false, error: error.message };
  }
}
