'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { TableData } from '@/lib/types';
import { Button } from './ui/button';
import { Wand2 } from 'lucide-react';

interface EditableDataTableProps {
  initialData: TableData;
  onDataChange: (data: TableData) => void;
  onExtractMetadata: (text: string) => void;
}

export function EditableDataTable({ initialData, onDataChange, onExtractMetadata }: EditableDataTableProps) {
  const [data, setData] = useState<TableData>(initialData);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    setData(initialData);
    setSelectedCells(new Set());
  }, [initialData]);

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = data.map((row, rIdx) =>
      rIdx === rowIndex ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell)) : row
    );
    setData(newData);
    onDataChange(newData);
  };

  const handleCellClick = (rowIndex: number, colIndex: number, event: React.MouseEvent) => {
    const cellId = `${rowIndex}-${colIndex}`;
    const newSelectedCells = new Set(selectedCells);
    if (event.ctrlKey || event.metaKey) {
        if(newSelectedCells.has(cellId)) {
            newSelectedCells.delete(cellId);
        } else {
            newSelectedCells.add(cellId);
        }
    } else {
        newSelectedCells.clear();
        newSelectedCells.add(cellId);
    }
    setSelectedCells(newSelectedCells);
  };

  const handleExtractClick = () => {
    const selectedTexts: string[] = [];
    selectedCells.forEach(cellId => {
        const [row, col] = cellId.split('-').map(Number);
        if (data[row] && data[row][col]) {
            selectedTexts.push(data[row][col]);
        }
    });
    if (selectedTexts.length > 0) {
        onExtractMetadata(selectedTexts.join(' '));
    }
  };

  if (!data || data.length === 0) {
    return <p className="text-muted-foreground text-center p-4">Could not parse table data or table is empty.</p>;
  }

  const headers = data[0];
  const bodyRows = data.slice(1);

  return (
    <div className="space-y-4">
        <div className="flex justify-end">
            <Button onClick={handleExtractClick} disabled={selectedCells.size === 0}>
                <Wand2 className="mr-2 h-4 w-4" />
                Extract Metadata from Selection
            </Button>
        </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="font-semibold bg-muted/50">{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bodyRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => {
                  const cellId = `${rowIndex+1}-${colIndex}`;
                  const isSelected = selectedCells.has(cellId);
                  return (
                    <TableCell key={colIndex} onClick={(e) => handleCellClick(rowIndex + 1, colIndex, e)} className={`p-0 cursor-pointer ${isSelected ? 'outline outline-2 outline-primary outline-offset-[-2px]' : ''}`}>
                      <Input
                        type="text"
                        value={cell}
                        onChange={(e) => handleCellChange(rowIndex + 1, colIndex, e.target.value)}
                        className="w-full h-full border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:bg-primary/10"
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
