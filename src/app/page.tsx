'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SparkIcon } from '@/components/icons';

export default function SplashPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // This check needs to be in useEffect to run on the client only
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  useEffect(() => {
    if (isLoggedIn === null) {
      // Wait until we have checked localStorage
      return;
    }

    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }, 2000); // 2-second splash screen

    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
      <SparkIcon className="h-24 w-24 text-primary" />
      <h1 className="mt-4 font-headline text-4xl font-bold">Rajsri SPARK</h1>
      <p className="mt-2 font-body text-muted-foreground">Community at your fingertips</p>
    </div>
  );
}
