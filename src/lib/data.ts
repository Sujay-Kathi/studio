import type { Event, Announcement, EmergencyContact, VolunteerService, Resident } from './types';
import { Shield, Siren, Ambulance, Check, Droplets, Wrench, Package } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/800/600`;
const findImageHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || `image`;

export const residents: Resident[] = [
    { id: '1', name: 'Arjun Sharma', flatNo: 'A-101', phone: '9876543210' },
    { id: '2', name: 'Priya Patel', flatNo: 'B-204', phone: '9876543211' },
    { id: '3', name: 'Rohan Mehta', flatNo: 'C-302', phone: '9876543212' },
    { id: '4', name: 'sujay', flatNo: 'a704', phone: '8618642639' },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Community Tree Plantation Drive',
    date: '2024-08-15',
    time: '09:00 AM',
    location: 'Central Park',
    description: 'Join us in making our community greener! We will be planting over 100 saplings in Central Park. All tools and saplings will be provided. Come with your family and friends to be a part of this wonderful initiative.',
    image: findImage('event-1'),
    imageHint: findImageHint('event-1'),
    priority: 'high',
    type: 'DRIVE',
    requirements: ['Gardening Gloves', 'Water Bottle', 'Sunscreen'],
    benefits: ['Certificate of Appreciation', 'Refreshments', 'Community Service Hours'],
    participants: 45,
    capacity: 100,
  },
  {
    id: '2',
    title: 'Workshop on Sustainable Living',
    date: '2024-08-22',
    time: '02:00 PM',
    location: 'Community Hall',
    description: 'Learn practical tips and tricks for a more sustainable lifestyle. Topics include waste reduction, composting, and creating your own eco-friendly cleaning products. An interactive session with experts.',
    image: findImage('event-2'),
    imageHint: findImageHint('event-2'),
    priority: 'normal',
    type: 'WORKSHOP',
    requirements: ['Notebook and Pen'],
    benefits: ['Free starter kit', 'Expert advice'],
    participants: 30,
    capacity: 50,
  },
  {
    id: '3',
    title: 'Annual Sports Day',
    date: '2024-09-01',
    time: '08:00 AM',
    location: 'Sports Ground',
    description: 'A fun-filled day of sports and games for all age groups. Events include track and field, team sports like volleyball and tug-of-war, and fun games for kids. Exciting prizes to be won!',
    image: findImage('event-3'),
    imageHint: findImageHint('event-3'),
    priority: 'normal',
    type: 'SPORTS',
    requirements: ['Sports attire', 'Water bottle'],
    benefits: ['Medals for winners', 'Participation certificates', 'Lunch'],
    participants: 150,
    capacity: 200,
  },
  {
    id: '4',
    title: 'Cultural Festival: Colors of Our Community',
    date: '2024-09-10',
    time: '05:00 PM',
    location: 'Open Air Theatre',
    description: 'A celebration of the diverse cultures within our community. Featuring music, dance performances, food stalls from various cuisines, and art displays. A vibrant evening for everyone to enjoy.',
    image: findImage('event-4'),
    imageHint: findImageHint('event-4'),
    priority: 'normal',
    type: 'CELEBRATION',
    requirements: [],
    benefits: ['Cultural experience', 'Delicious food', 'Live entertainment'],
    participants: 0,
    capacity: 500,
  },
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Water Supply Interruption',
    content: 'Please be advised that there will be a temporary interruption in the water supply for maintenance work. We apologize for any inconvenience caused.',
    author: 'Management',
    date: '2024-07-28',
    image: findImage('announcement-1'),
    imageHint: findImageHint('announcement-1'),
    timing: {
      from: '10:00 AM',
      to: '02:00 PM',
    },
  },
  {
    id: '2',
    title: 'Planned Power Outage for Tower B',
    content: 'A planned power outage is scheduled for Tower B to facilitate essential electrical upgrades. Please ensure your electronic devices are charged and take necessary precautions.',
    author: 'Maintenance Team',
    date: '2024-07-29',
    image: findImage('announcement-2'),
    imageHint: findImageHint('announcement-2'),
    timing: {
      from: '01:00 PM',
      to: '03:00 PM',
    },
  },
  {
    id: '3',
    title: 'Monthly Community Meeting',
    content: 'The monthly community meeting will be held to discuss upcoming projects and address resident concerns. All residents are encouraged to attend.',
    author: 'Residents Association',
    date: '2024-08-01',
    image: findImage('announcement-3'),
    imageHint: findImageHint('announcement-3'),
    timing: {
      eta: '07:00 PM',
    },
  },
];

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
