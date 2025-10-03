'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SparkIcon } from '@/components/icons';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function SplashScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Only redirect when the authentication check is complete
    if (!loading) {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <SparkIcon className="h-12 w-12 text-primary" />
      <h1 className="mt-4 text-2xl font-headline font-bold">Rajsri SPARK</h1>
      <Loader2 className="mt-4 h-6 w-6 animate-spin" />
    </div>
  );
}
