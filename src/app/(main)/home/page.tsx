'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  Calendar,
  Handshake,
  Megaphone,
  Siren,
} from 'lucide-react';
import { getEvents, getAnnouncements } from '@/lib/data';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import type { Announcement, Event } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);
  const [latestAnnouncement, setLatestAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [events, announcements] = await Promise.all([
        getEvents(),
        getAnnouncements(),
      ]);
      setUpcomingEvent(events[0] || null);
      setLatestAnnouncement(announcements[0] || null);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h1 className="font-headline text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your community at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {loading ? (
           <div className="col-span-1 sm:col-span-2">
             <Skeleton className="h-48 w-full rounded-lg" />
           </div>
        ) : upcomingEvent && (
          <Link href={`/events/${upcomingEvent.id}`} className="col-span-1 sm:col-span-2">
            <Card className="h-full transform-gpu overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
               <div className="relative h-40 w-full">
                <Image
                  src={upcomingEvent.image}
                  alt={upcomingEvent.title}
                  fill
                  className="object-cover"
                  data-ai-hint={upcomingEvent.imageHint}
                />
              </div>
              <CardHeader>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Upcoming Event
                </CardDescription>
                <CardTitle className="font-headline text-xl">{upcomingEvent.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{format(new Date(upcomingEvent.date), 'MMMM d, yyyy')}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        <Link href="/volunteer" className="col-span-1">
          <Card className="flex h-full transform-gpu flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <CardHeader>
              <Handshake className="mx-auto h-10 w-10 text-primary" />
              <CardTitle className="font-headline text-lg pt-2">Volunteer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Check your status</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/emergency" className="col-span-1">
          <Card className="flex h-full transform-gpu flex-col items-center justify-center text-center border-red-500/50 bg-red-50/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-red-900/20">
            <CardHeader>
              <Siren className="mx-auto h-10 w-10 text-destructive" />
              <CardTitle className="font-headline text-lg pt-2 text-red-800 dark:text-red-300">Emergency</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-between text-sm text-red-600 dark:text-red-400">
                  <span>Access Directory</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
            </CardContent>
          </Card>
        </Link>
        
        {loading ? (
            <div className="col-span-1 sm:col-span-2">
                <Skeleton className="h-48 w-full rounded-lg" />
            </div>
        ) : latestAnnouncement && (
          <Link href={`/announcements/${latestAnnouncement.id}`} className="col-span-1 sm:col-span-2">
             <Card className="h-full transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <CardDescription className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4" />
                  Latest Announcement
                </CardDescription>
                <CardTitle className="font-headline text-xl">{latestAnnouncement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{latestAnnouncement.content}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{format(new Date(latestAnnouncement.date), 'PP')}</span>
                    <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
}
