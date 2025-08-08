'use server';

/**
 * @fileOverview Flow to create vector embeddings for locations and data points.
 *
 * - createVectorEmbeddings - A function that handles the creation of vector embeddings.
 * - CreateVectorEmbeddingsInput - The input type for the createVectorEmbeddings function.
 * - CreateVectorEmbeddingsOutput - The return type for the createVectorEmbeddings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateVectorEmbeddingsInputSchema = z.object({
  locations: z.array(z.string()).describe('Array of location strings to embed.'),
  dataPoints: z.array(z.string()).describe('Array of data point strings to embed.'),
});
export type CreateVectorEmbeddingsInput = z.infer<typeof CreateVectorEmbeddingsInputSchema>;

const CreateVectorEmbeddingsOutputSchema = z.object({
  locationEmbeddings: z.array(z.array(z.number())).describe('Embeddings for locations.'),
  dataPointEmbeddings: z.array(z.array(z.number())).describe('Embeddings for data points.'),
});
export type CreateVectorEmbeddingsOutput = z.infer<typeof CreateVectorEmbeddingsOutputSchema>;

export async function createVectorEmbeddings(input: CreateVectorEmbeddingsInput): Promise<CreateVectorEmbeddingsOutput> {
  return createVectorEmbeddingsFlow(input);
}

const createVectorEmbeddingsFlow = ai.defineFlow(
  {
    name: 'createVectorEmbeddingsFlow',
    inputSchema: CreateVectorEmbeddingsInputSchema,
    outputSchema: CreateVectorEmbeddingsOutputSchema,
  },
  async input => {
    const locationEmbeddings = await Promise.all(
      input.locations.map(async location => {
        const {embedding} = await ai.embed({text: location});
        return embedding;
      })
    );

    const dataPointEmbeddings = await Promise.all(
      input.dataPoints.map(async dataPoint => {
        const {embedding} = await ai.embed({text: dataPoint});
        return embedding;
      })
    );

    return {
      locationEmbeddings,
      dataPointEmbeddings,
    };
  }
);
