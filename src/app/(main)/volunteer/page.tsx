'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { volunteerServices } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function VolunteerPage() {
  // In a real app, this state would be fetched and persisted.
  const [selectedServices, setSelectedServices] = useState<string[]>(['1', '2']);
  const { toast } = useToast();

  const handleToggle = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    // API call to save preferences would go here
    console.log('Saved services:', selectedServices);
    toast({
      title: 'Preferences Saved',
      description: 'Your volunteer services have been updated.',
    });
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Select Your Services</CardTitle>
          <CardDescription>
            Choose the areas where you'd like to contribute to the community.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {volunteerServices.map((service) => (
            <div
              key={service.id}
              className="flex items-start space-x-3 rounded-md border p-4 has-[[data-state=checked]]:bg-accent/50"
            >
              <Checkbox
                id={service.id}
                checked={selectedServices.includes(service.id)}
                onCheckedChange={() => handleToggle(service.id)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor={service.id} className="font-semibold">
                  {service.name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
          <Button onClick={handleSave} className="w-full mt-4">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
}
