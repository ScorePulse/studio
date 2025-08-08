'use server';
/**
 * @fileOverview AI flow to automatically detect and extract tables from uploaded Excel files.
 *
 * - extractTablesFromExcel - A function that handles the table extraction process.
 * - ExtractTablesFromExcelInput - The input type for the extractTablesFromExcel function, which is the data URI of the Excel file.
 * - ExtractTablesFromExcelOutput - The return type for the extractTablesFromExcel function, which is a string array of identified tables.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTablesFromExcelInputSchema = z.object({
  excelDataUri: z
    .string()
    .describe(
      "An Excel file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractTablesFromExcelInput = z.infer<typeof ExtractTablesFromExcelInputSchema>;

const ExtractTablesFromExcelOutputSchema = z.object({
  tables: z
    .array(z.string())
    .describe('An array of strings, each representing a detected table in the Excel file.'),
});
export type ExtractTablesFromExcelOutput = z.infer<typeof ExtractTablesFromExcelOutputSchema>;

export async function extractTablesFromExcel(input: ExtractTablesFromExcelInput): Promise<ExtractTablesFromExcelOutput> {
  return extractTablesFromExcelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractTablesFromExcelPrompt',
  input: {schema: ExtractTablesFromExcelInputSchema},
  output: {schema: ExtractTablesFromExcelOutputSchema},
  prompt: `You are an expert data analyst specializing in extracting tables from Excel files.

You will receive an Excel file as a data URI. Your task is to identify and extract all the tables present in the Excel file.

Return the tables in the following JSON format:
{
  "tables": ["table1", "table2", ...]
}

Here is the Excel file data URI:
{{media url=excelDataUri}}`,
});

const extractTablesFromExcelFlow = ai.defineFlow(
  {
    name: 'extractTablesFromExcelFlow',
    inputSchema: ExtractTablesFromExcelInputSchema,
    outputSchema: ExtractTablesFromExcelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
