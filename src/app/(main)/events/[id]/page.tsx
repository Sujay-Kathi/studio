import { notFound } from 'next/navigation';
import Image from 'next/image';
import { events } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  MapPin,
  Clock,
  ListChecks,
  Award,
  Calendar,
} from 'lucide-react';
import { format } from 'date-fns';
import { EventActions } from '@/components/event-actions';

type EventDetailPageProps = {
  params: { id: string };
};

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  const registrationPercentage = (event.participants / event.capacity) * 100;
  
  return (
    <div className="pb-8">
      <div className="relative h-60 w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          data-ai-hint={event.imageHint}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="p-4 space-y-6">
        <div className="flex flex-wrap gap-2">
          {event.priority === 'high' && (
            <Badge className="red-gradient border-none">HIGH PRIORITY</Badge>
          )}
          <Badge className="green-gradient border-none">{event.type}</Badge>
        </div>

        <h1 className="font-headline text-3xl font-bold">{event.title}</h1>

        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-foreground/90 leading-relaxed">{event.description}</p>
        
        {event.requirements.length > 0 && (
          <div className="space-y-3 rounded-lg border bg-card p-4">
            <h2 className="flex items-center gap-2 font-headline font-semibold">
              <ListChecks className="h-5 w-5 text-primary" />
              Requirements
            </h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {event.requirements.map((req, i) => <li key={i}>{req}</li>)}
            </ul>
          </div>
        )}

        {event.benefits.length > 0 && (
          <div className="space-y-3 rounded-lg border bg-card p-4">
             <h2 className="flex items-center gap-2 font-headline font-semibold">
              <Award className="h-5 w-5 text-primary" />
              Benefits
            </h2>
            <div className="flex flex-wrap gap-2">
              {event.benefits.map((benefit, i) => (
                <Badge key={i} variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Registrations</span>
            <span className="text-muted-foreground">{event.participants} / {event.capacity}</span>
          </div>
          <Progress value={registrationPercentage} />
        </div>

        <EventActions event={event} />
      </div>
    </div>
  );
}
