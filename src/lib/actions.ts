'use server';

import { extractTablesFromExcel } from '@/ai/flows/extract-tables-from-excel';
import { extractKpiMetadata } from '@/ai/flows/extract-kpi-metadata';
import { createVectorEmbeddings } from '@/ai/flows/create-vector-embeddings';
import { z } from 'zod';

const FileUploadSchema = z.object({
  fileDataUri: z.string().startsWith('data:'),
});

export async function handleFileUploadAction(prevState: any, formData: FormData) {
  const fileDataUri = formData.get('fileDataUri');
  const validatedFields = FileUploadSchema.safeParse({ fileDataUri });

  if (!validatedFields.success) {
    return {
      message: 'Invalid file data URI.',
      tables: [],
      error: true,
    };
  }

  try {
    const result = await extractTablesFromExcel({ excelDataUri: validatedFields.data.fileDataUri });
    if (result.tables && result.tables.length > 0) {
      return { message: 'Tables extracted successfully.', tables: result.tables, error: false };
    } else {
      return { message: 'No tables found in the uploaded file.', tables: [], error: true };
    }
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while extracting tables.', tables: [], error: true };
  }
}

const MetadataSchema = z.object({
  text: z.string().min(1),
});

export async function extractMetadataAction(text: string) {
  const validatedFields = MetadataSchema.safeParse({ text });

  if (!validatedFields.success) {
    return { error: 'Invalid input text for metadata extraction.' };
  }
  
  try {
    const result = await extractKpiMetadata({ text: validatedFields.data.text });
    return { data: result };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to extract metadata.' };
  }
}

const EmbeddingsSchema = z.object({
  locations: z.array(z.string()),
  dataPoints: z.array(z.string()),
});

export async function createEmbeddingsAction(locations: string[], dataPoints: string[]) {
    const validatedFields = EmbeddingsSchema.safeParse({ locations, dataPoints });

    if (!validatedFields.success) {
        return { error: 'Invalid data for creating embeddings.' };
    }

    try {
        await createVectorEmbeddings(validatedFields.data);
        return { success: 'Vector embeddings created successfully.' };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to create vector embeddings.' };
    }
}
