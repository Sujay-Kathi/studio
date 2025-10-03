'use client';

import AppHeader from '@/components/app-header';
import BottomNav from '@/components/bottom-nav';
import { AuthProvider } from '@/context/auth-context';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AppHeader />
      <main className="pt-16 pb-16">{children}</main>
      <BottomNav />
    </AuthProvider>
  );
}