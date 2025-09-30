'use client';

import { useState } from 'react';
import Image from 'next/image';
import { generateEventPoster } from '@/ai/flows/generate-event-poster';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventPosterGeneratorProps {
  eventTitle: string;
  eventDescription: string;
}

export function EventPosterGenerator({ eventTitle, eventDescription }: EventPosterGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [posterDataUri, setPosterDataUri] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!eventTitle || !eventDescription) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both an event title and description.',
      });
      return;
    }

    setLoading(true);
    setPosterDataUri(null);

    try {
      const result = await generateEventPoster({ eventTitle, eventDescription });
      setPosterDataUri(result.posterDataUri);
    } catch (error) {
      console.error('Failed to generate poster:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate the event poster. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!posterDataUri) return;
    const link = document.createElement('a');
    link.href = posterDataUri;
    link.download = `${eventTitle.replace(/\s+/g, '-')}-poster.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Wand2 className="text-primary" />
          AI Event Poster Assistant
        </CardTitle>
        <CardDescription>
          Generate an eye-catching poster for your event using AI. The current title and description will be used.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerate} disabled={loading} className="w-full">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Generating...' : 'Generate Poster'}
        </Button>

        {(loading || posterDataUri) && (
          <div className="mt-4 rounded-lg border bg-background p-4">
            {loading && (
              <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground aspect-square">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Generating your poster...</p>
              </div>
            )}
            {posterDataUri && (
              <div className="space-y-4">
                <Image
                  src={posterDataUri}
                  alt="Generated event poster"
                  width={512}
                  height={512}
                  className="rounded-md object-contain w-full h-auto"
                />
                <Button onClick={handleDownload} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Poster
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
