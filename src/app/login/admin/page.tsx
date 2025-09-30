'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SparkIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = () => {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAdminLoggedIn', 'true');
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
          <h1 className="font-headline text-4xl font-bold mt-4 text-gray-900 dark:text-white">Admin Login</h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center px-6 space-y-4">
        <div className="w-full max-w-xs space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input 
              type="text" 
              id="username" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              id="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
              onClick={handleAdminLogin}
              className="w-full bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-auto text-base"
          >
              Login
          </Button>
        </div>
      </main>
      <footer className="flex-shrink-0 pb-8">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Powered by Rajsri</p>
      </footer>
    </div>
  );
}
