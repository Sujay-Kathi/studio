import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { emergencyContacts } from '@/lib/data';
import { Phone } from 'lucide-react';

export default function EmergencyPage() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {emergencyContacts.map((contact) => (
          <a key={contact.id} href={`tel:${contact.number}`}>
            <Card className="flex h-32 flex-col items-center justify-center space-y-2 text-center transition-all duration-300 hover:shadow-xl hover:bg-accent">
              <contact.icon className="h-8 w-8 text-destructive" />
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-base">{contact.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{contact.number}</p>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">Tap any card to call immediately.</p>
      </div>
    </div>
  );
}
