'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleFileUploadAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Loader2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  tables: [],
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
      Detect Tables
    </Button>
  );
}

export function FileUploadForm({ onTablesExtracted }: { onTablesExtracted: (tables: string[]) => void }) {
  const [state, formAction] = useFormState(handleFileUploadAction, initialState);
  const [fileDataUri, setFileDataUri] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setFileDataUri(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName('');
      setFileDataUri(null);
    }
  };

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: state.message,
        });
      } else {
        toast({
          title: 'Upload Successful',
          description: state.message,
        });
        onTablesExtracted(state.tables);
        setFileName('');
        setFileDataUri(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
      }
    }
  }, [state, toast, onTablesExtracted]);
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fileDataUri) {
        toast({
            variant: 'destructive',
            title: 'No File Selected',
            description: 'Please select an Excel or CSV file to upload.',
        });
        return;
    }
    const formData = new FormData();
    formData.set('fileDataUri', fileDataUri);
    formAction(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">1. Upload File</CardTitle>
        <CardDescription>Upload an Excel or CSV file to begin.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} ref={formRef} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <Input id="file" name="file" type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} ref={fileInputRef}/>
            {fileName && <p className="text-sm text-muted-foreground">Selected: {fileName}</p>}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
