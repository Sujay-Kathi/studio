'use client';

import AppHeader from '@/components/app-header';
import BottomNav from '@/components/bottom-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <main className="pt-16 pb-16">{children}</main>
      <BottomNav />
    </>
  );
}