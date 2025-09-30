'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SparkIcon } from '@/components/icons';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, you'd check for a valid session token
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (isLoggedIn) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }, 2000); // 2-second splash screen

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
      <SparkIcon className="h-24 w-24 text-primary" />
      <h1 className="mt-4 font-headline text-4xl font-bold">Rajsri SPARK</h1>
      <p className="mt-2 font-body text-muted-foreground">Community at your fingertips</p>
    </div>
  );
}
