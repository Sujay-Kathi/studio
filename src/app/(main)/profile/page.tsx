'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, UserCog, ShieldAlert, LogOut, Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This check ensures that the code only runs on the client-side,
    // where localStorage is available.
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdmin(isAdminLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userFlatNo');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userAvatar');
    router.replace('/');
  };

  return (
    <div className="p-4 space-y-4">
      <Link href="/profile/edit">
        <Card className="transition-all duration-300 hover:shadow-md hover:bg-accent/50">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Edit className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-lg">Edit Profile</CardTitle>
            </div>
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
        </Card>
      </Link>
      <Link href="/volunteer">
        <Card className="transition-all duration-300 hover:shadow-md hover:bg-accent/50">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <UserCog className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-lg">Volunteer Profile</CardTitle>
            </div>
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
        </Card>
      </Link>
      {isAdmin && (
        <Link href="/admin">
          <Card className="transition-all duration-300 hover:shadow-md hover:bg-accent/50">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <ShieldAlert className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-lg">Admin Panel</CardTitle>
              </div>
              <ChevronRight className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
          </Card>
        </Link>
      )}
      <div className="pt-4">
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
