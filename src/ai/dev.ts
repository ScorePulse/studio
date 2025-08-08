import { config } from 'dotenv';
config();

import '@/ai/flows/extract-tables-from-excel.ts';
import '@/ai/flows/extract-kpi-metadata.ts';
import '@/ai/flows/create-vector-embeddings.ts';