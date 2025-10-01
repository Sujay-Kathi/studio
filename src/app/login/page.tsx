'use client';

import { useRouter } from 'next/navigation';
import { SparkIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getResidentByPhone } from '@/lib/data';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleUserLogin = async () => {
    setIsLoading(true);
    try {
      const resident = await getResidentByPhone(phone.trim());
      if (resident) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', resident.id);
        localStorage.setItem('userName', resident.name);
        localStorage.setItem('userFlatNo', resident.flatNo);
        localStorage.setItem('userPhone', resident.phone);
        if (resident.avatar) {
          localStorage.setItem('userAvatar', resident.avatar);
        } else {
          localStorage.removeItem('userAvatar');
        }
        router.replace('/home');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'This phone number is not registered. Please contact administration.',
        });
      }
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Login Error',
        description: 'An error occurred during login. Please try again.',
      });
    } finally {
        setIsLoading(false);
    }
  };

  const handleAdminLoginClick = () => {
    router.push('/login/admin');
  };

  if (isPageLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6 text-center">
          <SparkIcon className="h-24 w-24 text-primary" />
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

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
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              type="tel" 
              id="phone" 
              placeholder="Your 10-digit phone number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button
              onClick={handleUserLogin}
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-auto text-base"
          >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Logging in...' : 'Login as User'}
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
