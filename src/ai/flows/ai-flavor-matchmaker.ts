'use server';
/**
 * @fileOverview An AI agent that recommends South African hot sauces based on dishes or ingredients.
 *
 * - aiFlavorMatchmaker - A function that handles the sauce recommendation process.
 * - AIFlavorMatchmakerInput - The input type for the aiFlavorMatchmaker function.
 * - AIFlavorMatchmakerOutput - The return type for the aiFlavorMatchmaker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIFlavorMatchmakerInputSchema = z.object({
  dishesOrIngredients: z
    .string()
    .describe(
      'A description of South African dishes or ingredients the user plans to cook.'
    ),
});
export type AIFlavorMatchmakerInput = z.infer<typeof AIFlavorMatchmakerInputSchema>;

const AIFlavorMatchmakerOutputSchema = z.object({
  recommendedSauces: z
    .array(
      z.object({
        name: z.string().describe('The name of the recommended sauce.'),
        explanation: z
          .string()
          .describe(
            'A brief explanation of why this sauce pairs well with the provided dish or ingredients, considering South African flavors and heat levels.'
          ),
      })
    )
    .describe('An array of recommended sauces with explanations.'),
});
export type AIFlavorMatchmakerOutput = z.infer<typeof AIFlavorMatchmakerOutputSchema>;

export async function aiFlavorMatchmaker(
  input: AIFlavorMatchmakerInput
): Promise<AIFlavorMatchmakerOutput> {
  return aiFlavorMatchmakerFlow(input);
}

const aiFlavorMatchmakerPrompt = ai.definePrompt({
  name: 'aiFlavorMatchmakerPrompt',
  input: {schema: AIFlavorMatchmakerInputSchema},
  output: {schema: AIFlavorMatchmakerOutputSchema},
  prompt: `You are Mzansi Fire's expert South African hot sauce sommelier. Given a South African dish or ingredients, recommend 1-3 suitable hot sauces from the Mzansi Fire collection.
For each recommendation, provide the sauce's name and a brief, enticing explanation of why it pairs well, considering its heat level and flavor profile, specifically for the South African context.

Dish or ingredients: {{{dishesOrIngredients}}}`,
});

const aiFlavorMatchmakerFlow = ai.defineFlow(
  {
    name: 'aiFlavorMatchmakerFlow',
    inputSchema: AIFlavorMatchmakerInputSchema,
    outputSchema: AIFlavorMatchmakerOutputSchema,
  },
  async (input) => {
    const {output} = await aiFlavorMatchmakerPrompt(input);
    return output!;
  }
);
