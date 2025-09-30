'use client';

import { useRouter } from 'next/navigation';
import { SparkIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // In a real app, this would involve authentication.
    // For now, we just navigate to the home page.
    localStorage.setItem('isLoggedIn', 'true');
    router.replace('/home');
  };

  const handleAdminLogin = () => {
    // In a real app, this would involve authentication.
    // For now, we just navigate to the admin page.
    localStorage.setItem('isLoggedIn', 'true');
    router.replace('/admin');
  };

  return (
    <div className="flex h-screen flex-col font-display text-gray-800 dark:text-gray-200">
      <header className="flex-shrink-0 flex justify-center items-center pt-24 pb-12">
        <div className="text-center">
          <div className="inline-block p-4 bg-white dark:bg-card rounded-xl shadow-lg">
            <SparkIcon className="h-16 w-16 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold mt-4 text-gray-900 dark:text-white">Rajsri SPARK</h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-6 space-y-4">
        <Button
            onClick={handleLogin}
            className="w-full max-w-xs bg-primary text-gray-900 dark:text-gray-900 font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-auto text-base"
        >
            Login
        </Button>
        <Button
            onClick={handleAdminLogin}
            className="w-full max-w-xs bg-secondary text-gray-900 dark:text-gray-900 font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-auto text-base"
        >
            Admin Login
        </Button>
      </main>
      <footer className="flex-shrink-0 pb-8">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Powered by Rajsri</p>
      </footer>
    </div>
  );
}
