'use client';

import { useRouter } from 'next/navigation';
import { SparkIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [flatNo, setFlatNo] = useState('');

  const handleUserLogin = () => {
    if (name.trim() === '' || flatNo.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please enter your name and flat number.',
      });
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userFlatNo', flatNo);
    router.replace('/home');
  };

  const handleAdminLoginClick = () => {
    router.push('/login/admin');
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
      <main className="flex-grow flex flex-col items-center px-6 space-y-4">
        <div className="w-full max-w-xs space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
           <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="flatNo">Flat No.</Label>
            <Input 
              type="text" 
              id="flatNo" 
              placeholder="e.g. A-101" 
              value={flatNo}
              onChange={(e) => setFlatNo(e.target.value)} 
            />
          </div>
          <Button
              onClick={handleUserLogin}
              className="w-full bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-auto text-base"
          >
              Login as User
          </Button>
          <Button
              onClick={handleAdminLoginClick}
              variant="secondary"
              className="w-full text-secondary-foreground font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-auto text-base"
          >
              Admin Login
          </Button>
        </div>
      </main>
      <footer className="flex-shrink-0 pb-8">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Powered by Rajsri</p>
      </footer>
    </div>
  );
}
