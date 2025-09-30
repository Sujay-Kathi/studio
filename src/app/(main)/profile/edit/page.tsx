'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { residents } from '@/lib/data';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  flatNo: z.string().min(1, 'Flat number is required'),
  phone: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      flatNo: '',
      phone: '',
    },
  });

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const flatNo = localStorage.getItem('userFlatNo');
    const phone = localStorage.getItem('userPhone');

    if (name && flatNo && phone) {
      form.reset({ name, flatNo, phone });
    }
    setIsLoading(false);
  }, [form]);

  function onSubmit(data: ProfileFormValues) {
    // Update localStorage
    localStorage.setItem('userName', data.name);
    localStorage.setItem('userFlatNo', data.flatNo);

    // Update the mock database (in-memory)
    const residentIndex = residents.findIndex(r => r.phone === data.phone);
    if (residentIndex !== -1) {
      residents[residentIndex].name = data.name;
      residents[residentIndex].flatNo = data.flatNo;
    }

    toast({
      title: 'Profile Updated',
      description: 'Your details have been saved successfully.',
    });
    router.back();
  }
  
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Edit Your Profile</CardTitle>
          <CardDescription>
            Update your name and flat number. Contact an admin to change your phone number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="flatNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flat Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (read-only)</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
