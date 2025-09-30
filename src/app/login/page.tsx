'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SparkIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For non-admin login, we can still bypass authentication for now.
    localStorage.setItem('isLoggedIn', 'true');
    router.replace('/home');
  };

  const handleAdminLogin = () => {
    // Hardcoded credentials for admin for now
    if (email === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      router.replace('/admin');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid username or password for admin.',
      });
    }
  };

  return (
    <div className="flex h-screen flex-col font-display text-gray-800 dark:text-gray-200">
      <header className="flex-shrink-0 flex justify-center items-center pt-12 pb-8">
        <div className="text-center">
          <div className="inline-block p-4 bg-white dark:bg-card rounded-xl shadow-lg">
            <SparkIcon className="h-16 w-16 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold mt-4 text-gray-900 dark:text-white">Rajsri SPARK</h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center px-6 space-y-4">
        <div className="w-full max-w-xs space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Username</Label>
            <Input 
              type="text" 
              id="email" 
              placeholder="admin" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              id="password" 
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
              onClick={handleAdminLogin}
              className="w-full bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-auto text-base"
          >
              Admin Login
          </Button>
          <div className="relative w-full flex items-center justify-center my-2">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="flex-shrink mx-4 text-sm text-gray-500 dark:text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <Button
              onClick={handleLogin}
              variant="secondary"
              className="w-full text-secondary-foreground font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-auto text-base"
          >
              Continue as Guest
          </Button>
        </div>
      </main>
      <footer className="flex-shrink-0 pb-8">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Powered by Rajsri</p>
      </footer>
    </div>
  );
}
