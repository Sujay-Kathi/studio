import type { LucideIcon } from "lucide-react";

export type Screen = 'Home' | 'Events' | 'Announcements' | 'Emergency' | 'Profile' | 'Volunteer' | 'Admin' | 'Event Details' | 'Announcement Details';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  imageHint: string;
  priority: 'high' | 'normal';
  type: 'DRIVE' | 'WORKSHOP' | 'CELEBRATION' | 'MEETUP' | 'SPORTS';
  requirements: string[];
  benefits: string[];
  participants: number;
  capacity: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  imageHint: string;
  timing?: {
    eta?: string;
    from?: string;
    to?: string;
  };
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  icon: LucideIcon;
}

export interface VolunteerService {
  id: string;
  name: string;
  description: string;
}
