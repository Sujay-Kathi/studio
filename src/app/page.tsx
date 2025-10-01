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
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="flex items-center gap-2 font-semibold">
        <SparkIcon className="h-8 w-8" />
        <h1 className="text-2xl">Volunteer App</h1>
      </div>
      <Loader2 className="mt-4 h-6 w-6 animate-spin" />
    </div>
  );
}
