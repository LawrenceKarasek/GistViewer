import React from 'react';
import '../styles.css';

export interface TableDisplayProps<T extends object> {
  rows: T[];
  selectedRow: T | undefined;
  onClick: (row: T) => (e: React.MouseEvent<HTMLTableRowElement>) => void
  displayFields: string[];
  keyField: keyof T;
}

export function TableDisplay<T extends object>({
  rows,
  selectedRow,
  onClick,
  displayFields,
  keyField,
}: TableDisplayProps<T>) {
  return (
    <table>
      <thead>
        <tr>
        {displayFields.map((column) => (
            <th key={column}>{column}</th> 
        ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((item) => (
          <tr
            key={String(item[keyField])} 
            className={`table-row ${selectedRow && selectedRow[keyField] === item[keyField] ? 'selected' : ''}`}
            onClick={(e) => onClick(item)(e)} 
          >
            {displayFields.map((column) => (
              <td key={String(column)}>{String(item[column  as keyof T])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
