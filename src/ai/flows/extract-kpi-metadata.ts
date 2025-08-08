'use server';
/**
 * @fileOverview This file defines a Genkit flow for extracting key metadata (Data Point, Location, Time, Units, Values) from text.
 *
 * - extractKpiMetadata - A function that takes text as input and returns extracted metadata.
 * - ExtractKpiMetadataInput - The input type for the extractKpiMetadata function.
 * - ExtractKpiMetadataOutput - The return type for the extractKpiMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractKpiMetadataInputSchema = z.object({
  text: z.string().describe('The text from which to extract KPI metadata.'),
});
export type ExtractKpiMetadataInput = z.infer<typeof ExtractKpiMetadataInputSchema>;

const ExtractKpiMetadataOutputSchema = z.object({
  dataPoint: z.string().describe('The data point extracted from the text.'),
  location: z.string().describe('The location extracted from the text.'),
  time: z.string().describe('The time extracted from the text.'),
  units: z.string().describe('The units extracted from the text.'),
  value: z.string().describe('The value extracted from the text.'),
});
export type ExtractKpiMetadataOutput = z.infer<typeof ExtractKpiMetadataOutputSchema>;

export async function extractKpiMetadata(input: ExtractKpiMetadataInput): Promise<ExtractKpiMetadataOutput> {
  return extractKpiMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractKpiMetadataPrompt',
  input: {schema: ExtractKpiMetadataInputSchema},
  output: {schema: ExtractKpiMetadataOutputSchema},
  prompt: `You are an expert data extraction specialist. Your task is to extract key metadata from the given text.  The key metadata includes Data Point, Location, Time, Units, and Value.  If a field cannot be determined from the text, leave it blank, but always return valid JSON.

Text: {{{text}}}

Output the extracted metadata in JSON format.`,
});

const extractKpiMetadataFlow = ai.defineFlow(
  {
    name: 'extractKpiMetadataFlow',
    inputSchema: ExtractKpiMetadataInputSchema,
    outputSchema: ExtractKpiMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
