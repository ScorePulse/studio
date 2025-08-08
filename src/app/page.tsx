'use client';

import React, { useState, useTransition } from 'react';
import { FileUploadForm } from '@/components/file-upload-form';
import { EditableDataTable } from '@/components/editable-data-table';
import { KpiCard } from '@/components/kpi-card';
import { createEmbeddingsAction, extractMetadataAction } from '@/lib/actions';
import { KpiMetadata, TableData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { List, Download, Database, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

function parseTableString(tableStr: string): TableData {
    if (!tableStr) return [];
    try {
        const rows = tableStr.trim().split('\n').map(row => row.trim().replace(/^\||\|$/g, '').trim());
        return rows.map(row => row.split('|').map(cell => cell.trim()));
    } catch (e) {
        console.error("Failed to parse table string:", e);
        return [];
    }
}

export default function Home() {
  const [extractedTables, setExtractedTables] = useState<string[]>([]);
  const [selectedTableIndex, setSelectedTableIndex] = useState<number | null>(null);
  const [activeTableData, setActiveTableData] = useState<TableData | null>(null);
  const [kpiList, setKpiList] = useState<KpiMetadata[]>([]);
  const [isMetadataLoading, startMetadataTransition] = useTransition();
  const [isEmbeddingLoading, startEmbeddingTransition] = useTransition();
  const { toast } = useToast();

  const handleTablesExtracted = (tables: string[]) => {
    setExtractedTables(tables);
    setSelectedTableIndex(null);
    setActiveTableData(null);
    setKpiList([]);
  };

  const handleSelectTable = (index: number) => {
    setSelectedTableIndex(index);
    const parsedData = parseTableString(extractedTables[index]);
    setActiveTableData(parsedData);
    setKpiList([]);
  };

  const handleDataChange = (data: TableData) => {
    setActiveTableData(data);
  };

  const handleExtractMetadata = (text: string) => {
    startMetadataTransition(async () => {
      const result = await extractMetadataAction(text);
      if (result.data) {
        setKpiList(prev => [...prev, result.data as KpiMetadata]);
        toast({ title: 'Success', description: 'Metadata extracted.' });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.error });
      }
    });
  };
  
  const handleKpiChange = (index: number, updatedKpi: KpiMetadata) => {
    setKpiList(prev => prev.map((kpi, i) => i === index ? updatedKpi : kpi));
  };

  const handleGenerateJson = () => {
    const jsonString = JSON.stringify(kpiList, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kpi-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'JSON Generated', description: 'Your file has been downloaded.' });
  };

  const handleCreateEmbeddings = () => {
    startEmbeddingTransition(async () => {
        const locations = kpiList.map(kpi => kpi.location).filter(Boolean);
        const dataPoints = kpiList.map(kpi => kpi.dataPoint).filter(Boolean);
        
        if (locations.length === 0 && dataPoints.length === 0) {
            toast({ variant: 'destructive', title: 'No Data', description: 'No locations or data points to create embeddings for.' });
            return;
        }

        const result = await createEmbeddingsAction(locations, dataPoints);
        if (result.success) {
            toast({ title: 'Success', description: result.success });
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-1/4 max-w-sm border-r p-4 flex flex-col gap-4 bg-card">
        <div className="flex items-center gap-2">
            <Database className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-headline font-bold">Smart Data Migration</h1>
        </div>
        <FileUploadForm onTablesExtracted={handleTablesExtracted} />
        {extractedTables.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center gap-2"><List className="w-5 h-5"/>Detected Tables</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-48">
                    <div className="flex flex-col gap-2">
                        {extractedTables.map((_, index) => (
                        <Button
                            key={index}
                            variant={selectedTableIndex === index ? 'default' : 'outline'}
                            onClick={() => handleSelectTable(index)}
                            className="justify-start"
                        >
                            Table {index + 1}
                        </Button>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
          </Card>
        )}
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTableData ? (
          <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="font-headline text-xl">2. Clean & Transform Data</CardTitle>
                            <CardDescription>Edit the table data below. Select cells (use Ctrl/Cmd for multi-select) and use the button to extract metadata.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleGenerateJson} disabled={kpiList.length === 0}><Download className="mr-2 h-4 w-4" /> Export JSON</Button>
                            <Button onClick={handleCreateEmbeddings} disabled={kpiList.length === 0 || isEmbeddingLoading} variant="outline">
                                {isEmbeddingLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4" />}
                                Create Embeddings
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <EditableDataTable
                        initialData={activeTableData}
                        onDataChange={handleDataChange}
                        onExtractMetadata={handleExtractMetadata}
                    />
                </CardContent>
            </Card>

            {isMetadataLoading && (
                <div className="flex items-center justify-center p-8 text-muted-foreground">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Extracting metadata...
                </div>
            )}
            
            {kpiList.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2"><Wand2 className="w-5 h-5"/>3. Review Extracted KPIs</CardTitle>
                  <CardDescription>Review and edit the extracted Key Performance Indicators.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {kpiList.map((kpi, index) => (
                    <KpiCard key={index} metadata={kpi} onMetadataChange={(updated) => handleKpiChange(index, updated)} />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Image src="https://placehold.co/400x300.png" alt="Data Illustration" width={400} height={300} className="mb-8 rounded-lg" data-ai-hint="data analysis abstract" />
            <h2 className="text-2xl font-headline mb-2">Start Your Data Journey</h2>
            <p className="max-w-md">Upload a file to automatically detect tables, extract insights, and transform your data with the power of AI.</p>
          </div>
        )}
      </main>
    </div>
  );
}
