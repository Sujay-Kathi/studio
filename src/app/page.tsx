'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // This immediately replaces the root page with the login page.
    router.replace('/login');
  }, [router]);

  // Nothing is rendered here while the redirect happens.
  return null;
}
