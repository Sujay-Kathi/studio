import AppHeader from '@/components/app-header';
import BottomNav from '@/components/bottom-nav';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/30 dark:bg-black">
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col border-x bg-background shadow-2xl">
        <AppHeader />
        <main className="flex-1 pb-24 pt-16">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
