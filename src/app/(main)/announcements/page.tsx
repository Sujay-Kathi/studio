import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getAnnouncements } from '@/lib/data';
import { format } from 'date-fns';
import { UserCircle } from 'lucide-react';

export default async function AnnouncementsPage() {
    const sortedAnnouncements = await getAnnouncements();
  
  return (
    <div className="p-4 space-y-4">
      {sortedAnnouncements.map((announcement) => (
        <Link key={announcement.id} href={`/announcements/${announcement.id}`}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative h-40 w-full">
              <Image
                src={announcement.image}
                alt={announcement.title}
                fill
                className="object-cover"
                data-ai-hint={announcement.imageHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{announcement.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-sm text-muted-foreground">{announcement.content}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <div className='flex items-center gap-1'>
                    <UserCircle className='w-4 h-4' />
                    <span>{announcement.author}</span>
                </div>
                <span>{format(new Date(announcement.date), 'PP')}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
