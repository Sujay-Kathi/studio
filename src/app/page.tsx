'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SparkIcon } from '@/components/icons';
import { Loader2 } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        <div className="inline-block rounded-xl bg-card p-4 shadow-lg">
          <SparkIcon className="h-24 w-24 text-primary" />
        </div>
        <h1 className="font-headline text-4xl font-bold text-foreground">Rajsri SPARK</h1>
      </div>
      <div className="absolute bottom-16 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
}
