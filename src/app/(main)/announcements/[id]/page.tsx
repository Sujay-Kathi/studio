import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAnnouncementById } from '@/lib/data';
import { Calendar, Clock, UserCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import type { Announcement } from '@/lib/types';

const TimingInfo = ({ timing }: { timing: NonNullable<Announcement['timing']> }) => {
    if (timing.eta) {
        return <Badge variant="outline">ETA: {timing.eta}</Badge>;
    }
    if (timing.from && timing.to) {
        return <Badge variant="outline">From: {timing.from} To: {timing.to}</Badge>;
    }
    return null;
}

export default async function AnnouncementDetailPage({ params }: any) {
  const announcement = await getAnnouncementById(params.id);

  if (!announcement) {
    notFound();
  }

  return (
    <div>
      <div className="relative h-60 w-full">
        <Image
          src={announcement.image}
          alt={announcement.title}
          fill
          className="object-cover"
          data-ai-hint={announcement.imageHint}
        />
         <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="p-4 space-y-4">
        <h1 className="font-headline text-3xl font-bold">{announcement.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <UserCircle className="h-4 w-4 text-primary" />
            <span>{announcement.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{format(new Date(announcement.date), 'MMMM d, yyyy')}</span>
          </div>
          {announcement.timing && <TimingInfo timing={announcement.timing} />}
        </div>
        
        <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{announcement.content}</p>
      </div>
    </div>
  );
}
