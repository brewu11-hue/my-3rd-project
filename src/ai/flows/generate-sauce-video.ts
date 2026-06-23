'use server';
/**
 * @fileOverview A flow that generates an animated video preview of a hot sauce bottle.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateSauceVideoInputSchema = z.object({
  sauceName: z.string().describe('The name of the hot sauce.'),
  description: z.string().describe('A brief description of the sauce flavor and ingredients.'),
});
export type GenerateSauceVideoInput = z.infer<typeof GenerateSauceVideoInputSchema>;

const GenerateSauceVideoOutputSchema = z.object({
  videoUrl: z.string().describe('A data URI of the generated mp4 video.'),
});
export type GenerateSauceVideoOutput = z.infer<typeof GenerateSauceVideoOutputSchema>;

export async function generateSauceVideo(input: GenerateSauceVideoInput): Promise<GenerateSauceVideoOutput> {
  return generateSauceVideoFlow(input);
}

const generateSauceVideoFlow = ai.defineFlow(
  {
    name: 'generateSauceVideoFlow',
    inputSchema: GenerateSauceVideoInputSchema,
    outputSchema: GenerateSauceVideoOutputSchema,
  },
  async (input) => {
    const prompt = `A cinematic, high-quality close-up shot of a professional ${input.sauceName} hot sauce bottle. 
    The label is elegant and clearly shows the brand name 'Mzansi Fire'. 
    The bottle is sitting on a rustic wooden table with fresh peppers and spices in the background. 
    The camera slowly pans around the bottle. The sauce inside is a vibrant, appetizing color. 
    No landmarks, no tourism, strictly a high-end food product shot.`;

    let { operation } = await ai.generate({
      model: googleAI.model('veo-3.0-generate-preview'),
      prompt,
      config: {
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait for completion (timeout handled by server configuration)
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      if (operation.done) break;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (operation.error) {
      throw new Error('Failed to generate video: ' + operation.error.message);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media);
    if (!videoPart || !videoPart.media) {
      throw new Error('Failed to find the generated video in the response');
    }

    // Fetch the video data to return as a data URI
    const response = await fetch(`${videoPart.media.url}&key=${process.env.GEMINI_API_KEY}`);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    return {
      videoUrl: `data:video/mp4;base64,${base64}`,
    };
  }
);
