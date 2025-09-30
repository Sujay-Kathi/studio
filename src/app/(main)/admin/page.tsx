'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateEventForm } from "@/components/admin/create-event-form";
import { SendAnnouncementForm } from "@/components/admin/send-announcement-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      router.replace('/login/admin');
    }
  }, [router]);

  return (
    <div className="p-4">
      <Tabs defaultValue="create-event">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create-event">Create Event</TabsTrigger>
          <TabsTrigger value="send-announcement">Send Announcement</TabsTrigger>
        </TabsList>
        <TabsContent value="create-event">
          <CreateEventForm />
        </TabsContent>
        <TabsContent value="send-announcement">
          <SendAnnouncementForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
