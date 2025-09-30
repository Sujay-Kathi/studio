'use server';

import { revalidatePath } from 'next/cache';
import { events, announcements } from './data';
import type { Event, Announcement } from './types';

// NOTE: This is a mock implementation. In a real application,
// this would interact with a database. Changes are not persistent
// and will be lost on server restart.

export async function addEvent(eventData: Omit<Event, 'id' | 'image' | 'imageHint' | 'participants'>) {
  const newId = (Math.max(...events.map(e => parseInt(e.id))) + 1).toString();
  const newEvent: Event = {
    ...eventData,
    id: newId,
    // Using a placeholder for the image for now
    image: `https://picsum.photos/seed/${newId}/800/600`,
    imageHint: 'new event',
    participants: 0,
    priority: eventData.priority,
  };
  events.push(newEvent);
  revalidatePath('/events');
  revalidatePath('/home');
  return { success: true, event: newEvent };
}

export async function addAnnouncement(announcementData: Omit<Announcement, 'id' | 'image' | 'imageHint' | 'date'>) {
  const newId = (Math.max(...announcements.map(a => parseInt(a.id))) + 1).toString();
  const newAnnouncement: Announcement = {
    ...announcementData,
    id: newId,
    date: new Date().toISOString(),
    // Using a placeholder for the image for now
    image: `https://picsum.photos/seed/announcement-${newId}/800/600`,
    imageHint: 'new announcement',
  };
  announcements.unshift(newAnnouncement);
  revalidatePath('/announcements');
  revalidatePath('/home');
  return { success: true, announcement: newAnnouncement };
}
