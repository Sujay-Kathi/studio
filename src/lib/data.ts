import type { Event, Announcement, EmergencyContact, VolunteerService, Resident } from './types';
import { Shield, Siren, Ambulance, Check, Droplets, Wrench, Package } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/800/600`;
const findImageHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || `image`;

// --- Mock Data ---

let events: Event[] = [
  { id: '1', title: 'Community Planting Day', date: '2024-08-15', time: '09:00', location: 'Community Garden', description: 'Join us to plant new trees and beautify our community garden.', image: findImage('event-1'), imageHint: findImageHint('event-1'), priority: 'normal', type: 'DRIVE', requirements: ['Gardening gloves', 'Water bottle'], benefits: ['Free lunch', 'Certificate of participation'], participants: 35, capacity: 50 },
  { id: '2', title: 'Sustainability Workshop', date: '2024-08-22', time: '14:00', location: 'Clubhouse', description: 'Learn about sustainable living practices, recycling, and composting.', image: findImage('event-2'), imageHint: findImageHint('event-2'), priority: 'normal', type: 'WORKSHOP', requirements: ['Notebook and pen'], benefits: ['Free sustainable products kit'], participants: 48, capacity: 50 },
  { id: '3', title: 'Annual Sports Day', date: '2024-09-01', time: '08:00', location: 'Sports Ground', description: 'A day of fun and friendly competition for all age groups.', image: findImage('event-3'), imageHint: findImageHint('event-3'), priority: 'high', type: 'SPORTS', requirements: ['Sports attire'], benefits: ['Medals for winners', 'Refreshments for all'], participants: 92, capacity: 100 },
  { id: '4', title: 'Cultural Fest', date: '2024-09-15', time: '18:00', location: 'Amphitheater', description: 'Celebrate diversity with music, dance, and food from various cultures.', image: findImage('event-4'), imageHint: findImageHint('event-4'), priority: 'high', type: 'CELEBRATION', requirements: [], benefits: ['Dinner included'], participants: 150, capacity: 200 },
];

let announcements: Announcement[] = [
  { id: '1', title: 'Water Supply Interruption', content: 'The water supply will be interrupted on Friday from 10 AM to 1 PM for maintenance work. Please store water in advance.', author: 'Maintenance Team', date: '2024-08-10', image: findImage('announcement-1'), imageHint: findImageHint('announcement-1'), timing: { from: '10:00', to: '13:00' } },
  { id: '2', title: 'Power Outage Schedule', content: 'There will be a planned power outage on Saturday from 2 PM to 4 PM for grid upgradation.', author: 'Admin', date: '2024-08-09', image: findImage('announcement-2'), imageHint: findImageHint('announcement-2'), timing: { from: '14:00', to: '16:00' } },
  { id: '3', title: 'Monthly Community Meeting', content: 'The monthly community meeting will be held this Sunday at 5 PM in the clubhouse. Agenda: Park renovation and security updates.', author: 'Management', date: '2024-08-08', image: findImage('announcement-3'), imageHint: findImageHint('announcement-3'), timing: { eta: '17:00' } },
];

let residents: Resident[] = [
  { id: '1', name: 'John Doe', flatNo: 'A-101', phone: '1234567890' },
  { id: '2', name: 'Jane Smith', flatNo: 'B-202', phone: '0987654321', avatar: 'https://i.pravatar.cc/150?u=jane_smith' },
  { id: '3', name: 'Sujay Kathi', flatNo: 'C-303', phone: '8618642639' },
];

// --- Data Access Functions ---

export async function getEvents(): Promise<Event[]> {
  // Sort events by date in ascending order
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return Promise.resolve(sortedEvents);
}

export async function getEventById(id: string): Promise<Event | undefined> {
  return Promise.resolve(events.find(event => event.id === id));
}

export async function addEvent(eventData: Omit<Event, 'id' | 'image' | 'imageHint' | 'participants'>) {
    const newEvent: Event = {
      id: String(events.length + 1),
      ...eventData,
      image: `https://picsum.photos/seed/${Math.random()}/800/600`,
      imageHint: 'new event',
      participants: 0,
    };
    events.unshift(newEvent);
    return { success: true, eventId: newEvent.id };
}

export async function getAnnouncements(): Promise<Announcement[]> {
  // Sort announcements by date in descending order
  const sortedAnnouncements = [...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return Promise.resolve(sortedAnnouncements);
}

export async function getAnnouncementById(id: string): Promise<Announcement | undefined> {
    return Promise.resolve(announcements.find(ann => ann.id === id));
}

export async function addAnnouncement(announcementData: Omit<Announcement, 'id'| 'date' | 'image' | 'imageHint'>) {
    const newAnnouncement: Announcement = {
      id: String(announcements.length + 1),
      ...announcementData,
      date: new Date().toISOString(),
      image: `https://picsum.photos/seed/announcement-${Math.random()}/800/600`,
      imageHint: 'new announcement',
    };
    announcements.unshift(newAnnouncement);
    return { success: true, announcementId: newAnnouncement.id };
}

export async function getResidentByPhone(phone: string): Promise<Resident | undefined> {
    return Promise.resolve(residents.find(res => res.phone === phone));
}

export async function updateResident(id: string, data: Partial<{ name: string; flatNo: string; avatar?: string }>) {
  const residentIndex = residents.findIndex(res => res.id === id);
  if (residentIndex > -1) {
    residents[residentIndex] = { ...residents[residentIndex], ...data };
    return { success: true };
  }
  return { success: false, error: 'Resident not found' };
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
