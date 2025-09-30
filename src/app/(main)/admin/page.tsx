'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateEventForm } from "@/components/admin/create-event-form";
import { SendAnnouncementForm } from "@/components/admin/send-announcement-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      router.replace('/login/admin');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
