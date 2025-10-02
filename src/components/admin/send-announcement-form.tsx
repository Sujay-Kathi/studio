'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addAnnouncement } from '@/lib/actions';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const announcementSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  author: z.string().min(2, 'Author is required'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  eta: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

export function SendAnnouncementForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: '',
      content: '',
      author: 'Admin',
      imageUrl: '',
      eta: '',
      from: '',
      to: '',
    },
  });

  async function onSubmit(data: AnnouncementFormValues) {
    setIsSubmitting(true);
    try {
      const announcementData = {
        title: data.title,
        content: data.content,
        author: data.author,
        image: data.imageUrl,
        timing: {
          ...(data.eta && { eta: data.eta }),
          ...(data.from && { from: data.from }),
          ...(data.to && { to: data.to }),
        }
      };

      const result = await addAnnouncement(announcementData);

       if (result.success) {
        toast({
          title: 'Announcement Sent!',
          description: 'Your announcement has been published.',
        });
        form.reset();
      } else {
        throw new Error('Failed to send announcement');
      }
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to send the announcement. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Send New Announcement</CardTitle>
        <CardDescription>
          Fill in the details to send a new announcement to the community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Water Supply Update" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write the announcement details here..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-sm font-medium text-muted-foreground pt-2">Timing Details (Optional)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <FormField
                control={form.control}
                name="eta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ETA</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Sending...' : 'Send Announcement'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
