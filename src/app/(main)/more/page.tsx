import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, UserCog, ShieldAlert } from 'lucide-react';

export default function MorePage() {
  return (
    <div className="p-4 space-y-4">
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
      <Link href="/admin">
        <Card className="transition-all duration-300 hover:shadow-md hover:bg-accent/50">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <ShieldAlert className="h-8 w-8 text-accent" />
              <CardTitle className="font-headline text-lg">Admin Panel</CardTitle>
            </div>
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
