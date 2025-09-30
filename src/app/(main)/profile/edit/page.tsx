'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { residents } from '@/lib/data';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  flatNo: z.string().min(1, 'Flat number is required'),
  phone: z.string(),
  avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      flatNo: '',
      phone: '',
      avatar: '',
    },
  });

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const flatNo = localStorage.getItem('userFlatNo');
    const phone = localStorage.getItem('userPhone');
    const avatar = localStorage.getItem('userAvatar');

    if (name && flatNo && phone) {
      form.reset({ name, flatNo, phone, avatar: avatar || '' });
      if (avatar) {
        setAvatarPreview(avatar);
      }
    }
    setIsLoading(false);
  }, [form]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        form.setValue('avatar', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: ProfileFormValues) {
    setIsSaving(true);
    // This is a mock save. In a real app, you'd call an API.
    setTimeout(() => {
      const resident = residents.find(r => r.phone === data.phone);
      if (resident) {
        resident.name = data.name;
        resident.flatNo = data.flatNo;
        resident.avatar = data.avatar;
      }

      // Update localStorage
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userFlatNo', data.flatNo);
      if (data.avatar) {
        localStorage.setItem('userAvatar', data.avatar);
      } else {
        localStorage.removeItem('userAvatar');
      }

      // Dispatch a custom event to notify other components (like the header) of the change
      window.dispatchEvent(new CustomEvent('profileUpdated'));

      setIsSaving(false);
      toast({
        title: 'Profile Updated',
        description: 'Your details have been saved successfully.',
      });
      router.back();
    }, 1000);
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
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarPreview || undefined} alt="User avatar" />
                  <AvatarFallback>
                    <UserCircle className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="avatar-upload" className="cursor-pointer text-sm font-medium text-primary hover:underline">
                        Change Picture
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleAvatarChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSaving} />
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
                      <Input {...field} disabled={isSaving}/>
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
              <Button type="submit" className="w-full" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
