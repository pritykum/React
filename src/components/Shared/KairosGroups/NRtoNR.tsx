import React, { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/lara-light-blue/theme.css'; // or your theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface NRtoNRProps {
  site: string;
  date: string;
  data: {
    columns: string[];
    data: any[];
  };
}

const NRtoNR: React.FC<NRtoNRProps> = ({ data }) => {
  const columns = data?.columns || [];
  const rowData = data?.data || [];

  const dt = useRef<DataTable<any>>(null);

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const totalRows = rowData.length;
  const rowsPerPageOptions = [20, 50, 100, totalRows];
  return (
    <div className="nr-to-nr-results">
      {columns.length > 0 ? (
        <>
          <div className="flex justify-end mb-2">
            <Button
              label="Export CSV"
              icon="pi pi-download"
              onClick={exportCSV}
              className="p-button-sm p-button-outlined"
            />
          </div>

          <DataTable
            ref={dt}
            value={rowData}
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

export default NRtoNR;
