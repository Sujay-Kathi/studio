'use client';

import { useForm, useWatch } from 'react-hook-form';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { EventPosterGenerator } from './event-poster-generator';
import { addEvent } from '@/lib/actions';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { Event } from '@/lib/types';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(3, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.string().min(1, 'Type is required').transform(v => v.toUpperCase() as Event['type']),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  highPriority: z.boolean().default(false),
});

type EventFormValues = z.infer<typeof eventSchema>;

export function CreateEventForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: 'Community Yoga Session',
      date: new Date().toISOString().split('T')[0],
      time: '07:00',
      location: 'Park Amphitheater',
      description: 'Start your Sunday with a refreshing yoga session for all levels.',
      type: 'WORKSHOP',
      capacity: 50,
      requirements: 'Yoga Mat, Water Bottle',
      benefits: 'Free snacks, Certificate',
      highPriority: false,
    },
  });

  const { title, description } = useWatch({ control: form.control });

  async function onSubmit(data: EventFormValues) {
    setIsSubmitting(true);
    try {
      const eventData = {
        ...data,
        priority: data.highPriority ? 'high' : 'normal',
        requirements: data.requirements ? data.requirements.split(',').map(s => s.trim()) : [],
        benefits: data.benefits ? data.benefits.split(',').map(s => s.trim()) : [],
      };
      const result = await addEvent(eventData as any);
      if (result.success) {
        toast({
          title: 'Event Created!',
          description: `The event "${data.title}" has been successfully created.`,
        });
        form.reset();
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to create the event. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Create New Event</CardTitle>
        <CardDescription>
          Fill in the details to create a new community event.
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
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Summer Festival" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Community Hall" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the event..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <EventPosterGenerator eventTitle={title} eventDescription={description} />
            
            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., WORKSHOP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Yoga Mat, Water Bottle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Free snacks, Certificate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="highPriority"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      High Priority Event
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Creating...' : 'Create Event'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
