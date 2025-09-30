import type { Event, Announcement, EmergencyContact, VolunteerService, Resident } from './types';
import { Shield, Siren, Ambulance, Check, Droplets, Wrench, Package } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';
import { db } from '@/firebase/config';
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { unstable_noStore as noStore } from 'next/cache';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/800/600`;
const findImageHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || `image`;

// --- Firestore Data Fetching ---

export async function getResidents(): Promise<Resident[]> {
  noStore();
  const residentsCol = collection(db, 'residents');
  const residentSnapshot = await getDocs(residentsCol);
  const residentList = residentSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Resident));
  return residentList;
}

export async function getResidentByPhone(phone: string): Promise<Resident | null> {
    noStore();
    const q = query(collection(db, "residents"), where("phone", "==", phone), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return null;
    }
    const residentDoc = querySnapshot.docs[0];
    return { ...residentDoc.data(), id: residentDoc.id } as Resident;
}


export async function getEvents(): Promise<Event[]> {
  noStore();
  const eventsCol = query(collection(db, 'events'), orderBy('date', 'asc'));
  const eventSnapshot = await getDocs(eventsCol);
  const eventList = eventSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Event));
  return eventList;
}

export async function getEventById(id: string): Promise<Event | null> {
    noStore();
    const eventDocRef = doc(db, 'events', id);
    const eventDoc = await getDoc(eventDocRef);
    if (eventDoc.exists()) {
        return { ...eventDoc.data(), id: eventDoc.id } as Event;
    }
    return null;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  noStore();
  const announcementsCol = query(collection(db, 'announcements'), orderBy('date', 'desc'));
  const announcementSnapshot = await getDocs(announcementsCol);
  const announcementList = announcementSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Announcement));
  return announcementList;
}

export async function getAnnouncementById(id: string): Promise<Announcement | null> {
    noStore();
    const announcementDocRef = doc(db, 'announcements', id);
    const announcementDoc = await getDoc(announcementDocRef);
    if (announcementDoc.exists()) {
        return { ...announcementDoc.data(), id: announcementDoc.id } as Announcement;
    }
    return null;
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
  { id: '4', name: 'Emergency Response', description: 'Be a part of the emergency response team.' },
  { id: '5', name: 'Community Patrol', description: 'Assist in neighborhood watch programs.' },
];
