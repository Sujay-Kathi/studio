import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import type { Event, Announcement, EmergencyContact, VolunteerService, Resident } from './types';
import { Shield, Siren, Ambulance, Wrench } from 'lucide-react';
import { db } from '@/firebase/config';

// --- Data Access Functions ---

export async function getEvents(): Promise<Event[]> {
  try {
    const eventsCol = collection(db, 'events');
    const eventSnapshot = await getDocs(eventsCol);
    const events = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
    // Sort events by date in ascending order
    const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sortedEvents;
  } catch (error) {
    console.error("Error fetching events from Firestore: ", error);
    return [];
  }
}

export async function getEventById(id: string): Promise<Event | undefined> {
  try {
    const eventDoc = doc(db, 'events', id);
    const eventSnapshot = await getDoc(eventDoc);
    if (eventSnapshot.exists()) {
      return { id: eventSnapshot.id, ...eventSnapshot.data() } as Event;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching event by ID from Firestore: ", error);
    return undefined;
  }
}

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const announcementsCol = collection(db, 'announcements');
    const announcementSnapshot = await getDocs(announcementsCol);
    const announcements = announcementSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
    // Sort announcements by date in descending order
    const sortedAnnouncements = announcements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sortedAnnouncements;
  } catch (error) {
    console.error("Error fetching announcements from Firestore: ", error);
    return [];
  }
}

export async function getAnnouncementById(id: string): Promise<Announcement | undefined> {
  try {
    const announcementDoc = doc(db, 'announcements', id);
    const announcementSnapshot = await getDoc(announcementDoc);
    if (announcementSnapshot.exists()) {
      return { id: announcementSnapshot.id, ...announcementSnapshot.data() } as Announcement;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching announcement by ID from Firestore: ", error);
    return undefined;
  }
}

export async function getResidentByPhone(phone: string): Promise<Resident | undefined> {
    try {
        const residentsCol = collection(db, 'residents');
        const q = query(residentsCol, where("phone", "==", phone));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const residentDoc = querySnapshot.docs[0];
            return { id: residentDoc.id, ...residentDoc.data() } as Resident;
        }
        return undefined;
    } catch (error) {
        console.error("Error fetching resident by phone from Firestore: ", error);
        return undefined;
    }
}

// --- Static Data ---

export const emergencyContacts: EmergencyContact[] = [
  { id: '1', name: 'Security', number: '9876543210', icon: Shield },
  { id: '2', name: 'Fire', number: '101', icon: Siren },
  { id: '3', name: 'Ambulance', number: '102', icon: Ambulance },
  { id: '4', name: 'Plumber', number: '8765432109', icon: Wrench },
  { id: '5', name: 'Electrician', number: '7654321098', icon: Wrench },
  { id: '6', name: 'Gas Leak', number: '6543210987', icon: Siren },
];

export const volunteerServices: VolunteerService[] = [
  { id: '1', name: 'Event Management', description: 'Help plan and organize community events.' },
  { id: '2', name: 'Green Initiative', description: 'Participate in gardening and cleanliness drives.' },
  { id: '3', name: 'Teaching & Mentoring', description: 'Tutor children or mentor young adults.' },
  { id: '4
', name: 'Emergency Response', description: 'Be a part of the emergency response team.' },
  { id: '5', name: 'Community Patrol', description: 'Assist in neighborhood watch programs.' },
];
