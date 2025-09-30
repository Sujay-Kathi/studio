import Link from 'next/link';
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
import { events, announcements } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function HomePage() {
  const upcomingEvent = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  const latestAnnouncement = [...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h1 className="font-headline text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your community at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {upcomingEvent && (
          <Link href={`/events/${upcomingEvent.id}`} className="col-span-1 sm:col-span-2">
            <Card className="h-full transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
          <Card className="h-full transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <Handshake className="h-4 w-4" />
                Volunteer
              </CardDescription>
              <CardTitle className="font-headline text-lg">Your Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>3 Services</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/emergency" className="col-span-1">
          <Card className="h-full transform-gpu border-red-500/50 bg-red-50/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-red-900/20">
            <CardHeader>
              <CardDescription className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Siren className="h-4 w-4" />
                Emergency
              </CardDescription>
              <CardTitle className="font-headline text-lg text-red-800 dark:text-red-300">Quick Call</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-between text-sm text-red-600 dark:text-red-400">
                  <span>Access Directory</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
            </CardContent>
          </Card>
        </Link>
        
        {latestAnnouncement && (
          <Link href="/announcements" className="col-span-1 sm:col-span-2">
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
