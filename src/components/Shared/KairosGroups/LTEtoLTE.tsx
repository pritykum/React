import React, { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface LTEtoLTEProps {
  site: string;
  date: string;
  data: {
    columns: string[];
    data: any[];
  };
}

const LTEtoLTE: React.FC<LTEtoLTEProps> = ({ data }) => {
  const columns = data?.columns || [];
  const rows = data?.data || [];

  const dt = useRef<DataTable<any>>(null);

  const exportCSV = () => {
    dt.current?.exportCSV();
  };
  const totalRows = rows.length;
  const rowsPerPageOptions = [20, 50, 100, totalRows];
  return (
    <div className="lte-to-lte-results">
      {columns.length > 0 ? (
        <>
          <div className="flex justify-end mb-2">
            <Button
              label="Export 4G-4G"
              icon="pi pi-download"
              onClick={exportCSV}
              className="p-button-sm p-button-outlined"
            />
          </div>

          <DataTable
            ref={dt}
            value={rows}
            scrollable
            scrollHeight="500px"
            paginator
            rows={20}
            rowsPerPageOptions={rowsPerPageOptions}
            responsiveLayout="scroll"
            stripedRows
            className="p-datatable-sm"
          >
            {columns.map((col, idx) => (
              <Column
                key={idx}
                field={col}
                header={col.replace(/_/g, ' ')}
                sortable
                filter
              />
            ))}
          </DataTable>
        </>
      ) : (
        <p style={{ color: 'gray' }}>No neighbor data available</p>
      )}
    </div>
  );
};

export default LTEtoLTE;
