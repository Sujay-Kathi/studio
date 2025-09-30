'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, User } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import type { Screen } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userFlatNo, setUserFlatNo] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const flatNo = localStorage.getItem('userFlatNo');
    setUserName(name);
    setUserFlatNo(flatNo);
    if (name) {
      setUserInitial(name.charAt(0).toUpperCase());
    }
  }, []);

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
    '/announcements',
    '/emergency',
    '/profile',
  ].includes(pathname);

  return (
    <header className="fixed top-0 z-50 w-full max-w-md border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4">
        <div className="flex w-1/4 justify-start">
          {showBack ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer border-2 border-primary/50">
                  <AvatarFallback>{userInitial || <User />}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>{userName || 'Resident'}</DropdownMenuItem>
                <DropdownMenuItem disabled>
                  {userFlatNo ? `Flat no: ${userFlatNo}`: 'Flat No. not found'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
