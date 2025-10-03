'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, User, UserCog, LogOut } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { auth } from '@/firebase/config';

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { userData } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    // Clear any lingering local storage just in case
    localStorage.clear();
    router.replace('/login');
  };

  const userInitial = userData?.name ? userData.name.charAt(0).toUpperCase() : '';

  const getTitle = (): Screen => {
    if (pathname === '/home') return 'Dashboard';
    if (pathname === '/events') return 'Community Events';
    if (pathname.startsWith('/events/')) return 'Event Details';
    if (pathname === '/announcements') return 'Announcements';
    if (pathname.startsWith('/announcements/')) return 'Announcement Details';
    if (pathname === '/emergency') return 'Emergency Directory';
    if (pathname === '/profile') return 'Profile';
    if (pathname === '/profile/edit') return 'Edit Profile';
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
                  <AvatarImage src={userData?.avatarUrl || undefined} alt="User avatar" />
                  <AvatarFallback>{userInitial || <User className="h-4 w-4"/>}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>
                  <Link href="/profile/edit" className="flex items-center gap-2">
                    <UserCog className="h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>{userData?.name || 'Resident'}</DropdownMenuItem>
                <DropdownMenuItem disabled>
                  {userData?.flatNo ? `Flat no: ${userData.flatNo}`: 'Flat No. not found'}
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  {userData?.phone ? `Phone: ${userData.phone}`: 'Phone No. not found'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
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
