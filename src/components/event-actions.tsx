'use client';

import { Button } from '@/components/ui/button';
import type { Event } from '@/lib/types';
import { format } from 'date-fns';
import { Bell, CheckCircle, Share2 } from 'lucide-react';

export function EventActions({ event }: { event: Pick<Event, 'id' | 'title' | 'date'> }) {
  const shareOnWhatsApp = () => {
    const text = `Check out this event: ${event.title} on ${format(new Date(event.date), 'PP')}! More details: ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="grid grid-cols-3 gap-2 pt-4">
      <Button className="col-span-3 sm:col-span-1" size="lg">
        <CheckCircle /> Register
      </Button>
      <Button variant="outline" size="lg">
        <Bell /> Set Reminder
      </Button>
      <Button variant="outline" size="lg" onClick={shareOnWhatsApp}>
        <Share2 /> Share
      </Button>
    </div>
  );
}
