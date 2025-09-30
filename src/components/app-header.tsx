'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import type { Screen } from '@/lib/types';

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const getTitle = (): Screen => {
    if (pathname === '/home') return 'Dashboard';
    if (pathname === '/events') return 'Community Events';
    if (pathname.startsWith('/events/')) return 'Event Details';
    if (pathname === '/announcements') return 'Announcements';
    if (pathname.startsWith('/announcements/')) return 'Announcement Details';
    if (pathname === '/emergency') return 'Emergency Directory';
    if (pathname === '/profile') return 'Profile';
    if (pathname === '/volunteer') return 'Volunteer Profile';
    if (pathname === '/admin') return 'Admin Panel';
    return 'Rajsri SPARK';
  };

  const title = getTitle();
  const showBack = ![
    '/home',
    '/events',
    '/emergency',
    '/profile',
  ].includes(pathname);

  return (
    <header className="fixed top-0 z-50 w-full max-w-md border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4">
        <div className="w-1/4">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="w-1/2 text-center">
          <h1 className="truncate font-headline text-lg font-bold">{title}</h1>
        </div>
        <div className="flex w-1/4 justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
