import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getEvents } from '@/lib/data';
import { format } from 'date-fns';

export default async function EventsPage() {
  const sortedEvents = await getEvents();
  
  return (
    <div className="p-4 space-y-8">
      {sortedEvents.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="relative h-40 w-full">
              {event.mediaType === 'video' && event.mediaUrl ? (
                <video
                  src={event.mediaUrl}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  data-ai-hint={event.imageHint}
                />
              )}
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
                <Badge variant={event.priority === 'high' ? 'destructive' : 'secondary'}>
                  {event.type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
