'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SparkIcon } from '@/components/icons';
import { Loader2 } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Use Firebase's auth state listener for a reliable check
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Add a small delay to prevent screen flicker
      setTimeout(() => {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
      }, 1000);
    });
    return () => unsubscribe();
  }, [router]); 

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <SparkIcon className="h-12 w-12 text-primary" />
      <h1 className="mt-4 text-2xl font-headline font-bold">Rajsri SPARK</h1>
      <Loader2 className="mt-4 h-6 w-6 animate-spin" />
    </div>
  );
}
