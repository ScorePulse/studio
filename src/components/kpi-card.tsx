'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KpiMetadata } from '@/lib/types';
import { Building, Calendar, Package, Ruler, Tag } from 'lucide-react';
import React from 'react';

interface KpiCardProps {
  metadata: KpiMetadata;
  onMetadataChange: (updatedMetadata: KpiMetadata) => void;
}

export function KpiCard({ metadata, onMetadataChange }: KpiCardProps) {

  const handleChange = (field: keyof KpiMetadata, value: string) => {
    onMetadataChange({ ...metadata, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            Extracted KPI
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`dataPoint-${metadata.value}`} className="flex items-center gap-2 text-muted-foreground"><Package className="w-4 h-4" />Data Point</Label>
          <Input id={`dataPoint-${metadata.value}`} value={metadata.dataPoint} onChange={(e) => handleChange('dataPoint', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`location-${metadata.value}`} className="flex items-center gap-2 text-muted-foreground"><Building className="w-4 h-4" />Location</Label>
          <Input id={`location-${metadata.value}`} value={metadata.location} onChange={(e) => handleChange('location', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`time-${metadata.value}`} className="flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4" />Time</Label>
          <Input id={`time-${metadata.value}`} value={metadata.time} onChange={(e) => handleChange('time', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`units-${metadata.value}`} className="flex items-center gap-2 text-muted-foreground"><Ruler className="w-4 h-4" />Units</Label>
          <Input id={`units-${metadata.value}`} value={metadata.units} onChange={(e) => handleChange('units', e.target.value)} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor={`value-${metadata.value}`} className="flex items-center gap-2 text-muted-foreground"><Tag className="w-4 h-4" />Value</Label>
          <Input id={`value-${metadata.value}`} value={metadata.value} onChange={(e) => handleChange('value', e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}
