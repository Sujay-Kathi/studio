'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SparkIcon } from '@/components/icons';
import { Loader2 } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // This timeout is to ensure the splash screen is visible for a moment.
    // In a real app, you might be loading data here.
    const timer = setTimeout(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (isLoggedIn) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }, 1500); // Show splash for 1.5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 text-center">
        <SparkIcon className="h-24 w-24 text-primary" />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}
