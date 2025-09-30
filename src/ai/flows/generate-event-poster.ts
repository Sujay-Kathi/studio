'use server';

/**
 * @fileOverview A flow for generating event posters using AI.
 *
 * - generateEventPoster - A function that generates an event poster.
 * - GenerateEventPosterInput - The input type for the generateEventPoster function.
 * - GenerateEventPosterOutput - The return type for the generateEventPoster function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventPosterInputSchema = z.object({
  eventTitle: z.string().describe('The title of the event.'),
  eventDescription: z.string().describe('A brief description of the event.'),
});

export type GenerateEventPosterInput = z.infer<typeof GenerateEventPosterInputSchema>;

const GenerateEventPosterOutputSchema = z.object({
  posterDataUri: z
    .string()
    .describe(
      'The generated event poster as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected description
    ),
});

export type GenerateEventPosterOutput = z.infer<typeof GenerateEventPosterOutputSchema>;

export async function generateEventPoster(input: GenerateEventPosterInput): Promise<GenerateEventPosterOutput> {
  return generateEventPosterFlow(input);
}

const generateEventPosterPrompt = ai.definePrompt({
  name: 'generateEventPosterPrompt',
  input: {schema: GenerateEventPosterInputSchema},
  output: {schema: GenerateEventPosterOutputSchema},
  prompt: `Generate an eye-catching and contextually relevant event poster for the following event:\n\nEvent Title: {{{eventTitle}}}\nEvent Description: {{{eventDescription}}}\n\nInclude the event title prominently in the poster. The poster should be visually appealing and suitable for promoting the event on social media and within the community.\n\nPlease ensure the generated image is a data URI that includes a MIME type and uses Base64 encoding.`,
});

const generateEventPosterFlow = ai.defineFlow(
  {
    name: 'generateEventPosterFlow',
    inputSchema: GenerateEventPosterInputSchema,
    outputSchema: GenerateEventPosterOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate an eye-catching and contextually relevant event poster for the following event:\n\nEvent Title: ${input.eventTitle}\nEvent Description: ${input.eventDescription}\n\nInclude the event title prominently in the poster. The poster should be visually appealing and suitable for promoting the event on social media and within the community.`,
    });

    if (!media?.url) {
      throw new Error('Failed to generate event poster.');
    }

    return {posterDataUri: media.url};
  }
);
