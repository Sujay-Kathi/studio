'use client';

import { useRouter } from 'next/navigation';
import { SparkIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // In a real app, this would involve authentication.
    // Here, we just set a flag in localStorage for demo purposes.
    localStorage.setItem('isLoggedIn', 'true');
    router.replace('/home');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <SparkIcon className="h-20 w-20 text-primary" />
          <h1 className="mt-4 font-headline text-3xl font-bold">Welcome to Rajsri SPARK</h1>
          <p className="mt-1 text-muted-foreground">Sign in to connect with your community</p>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center font-headline text-2xl">Access Your Community</CardTitle>
            <CardDescription className="text-center">Click the button below to enter the app.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/90">
              Enter Rajsri SPARK
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
