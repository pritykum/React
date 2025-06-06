import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-fixedheader-dt/css/fixedHeader.dataTables.css';
import 'datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.css';
import 'datatables.net';
import 'datatables.net-fixedheader';
import 'datatables.net-fixedcolumns';

interface LTEtoLTEProps {
  data: { [key: string]: any }[];
}

const LTEtoLTE: React.FC<LTEtoLTEProps> = ({ data }) => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const table = $(tableRef.current!).DataTable({
      paging: true,
      searching: true,
      orderCellsTop: true,
      fixedHeader: true,
      autoWidth: false,
      pageLength: 25,
      lengthMenu: [[25, 50, 75, 100, -1], [25, 50, 75, 100, 'All']],
      fixedColumns: { leftColumns: 6, rightColumns: 0 }
    });

    $.fn.dataTable.ext.search.push(function (settings, dataRow, dataIndex) {
      const inputs = $('#LNREL thead tr:eq(1) th input');
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const value = $(input).val()?.toString().trim();
        if (value) {
          const cellValue = dataRow[i] || '';
          if (value.startsWith('>')) {
            const num = parseFloat(value.substring(1).trim());
            if (isNaN(num) || parseFloat(cellValue) <= num) return false;
          } else if (value.startsWith('<')) {
            const num = parseFloat(value.substring(1).trim());
            if (isNaN(num) || parseFloat(cellValue) >= num) return false;
          } else if (!isNaN(Number(value))) {
            if (parseFloat(cellValue) !== parseFloat(value)) return false;
          } else if (!cellValue.toLowerCase().includes(value.toLowerCase())) {
            return false;
          }
        }
      }
      return true;
    });

    $('#LNREL thead tr:eq(1) th input').on('keyup change clear', function () {
      table.draw();
    });

    return () => {
      table.destroy();
    };
  }, []);

  const getConditionalClass = (column: string, value: any, row: any) => {
    if (column === 'PCI_COLLISION' || column === 'PCI_Confusion') {
      return value === 'False' ? 'color-green' : 'color-red';
    }
    if ((column === 'LNHOIF_Defined' || column === 'IRFIM_Defined')) {
      return value === 'Not Defined' ? 'color-red' : 'color-green';
    }
    if (column === 'amleAllowed' || column === 'removeAllowed') {
      return value === 'True' ? 'color-green' : 'color-red';
    }
    if (column === 'nrStatus') {
      return value === 'available' ? 'color-green' : 'color-red';
    }
    if (column === 'handoverAllowed') {
      return value === 'allowed' ? 'color-green' : 'color-red';
    }
    if (column === 'HOSuccRate') {
      if (row['HO_Attempt'] === 0) return '';
      if (row['HO_Attempt'] > 10 && parseFloat(value) < 80.0) return 'color-red';
      if (parseFloat(value) > 95.0) return 'color-green';
    }
    if (column === 'HOSuccRate(n-1)') {
      if (row['HO_Attempt(n-1)'] === 0) return '';
      const val = parseFloat(value);
      if (row['HO_Attempt(n-1)'] > 10 && val < 80.0) return 'color-red';
      if (val > 95.0) return 'color-green';
    }
    if (column === 'HOSuccRate(n-2)') {
      if (row['HO_Attempt(n-2)'] === 0) return '';
      const val = parseFloat(value);
      if (row['HO_Attempt(n-2)'] > 10 && val < 80.0) return 'color-red';
      if (val > 95.0) return 'color-green';
    }
    return '';
  };

  const headers = Object.keys(data[0] || {});

  return (
    <div className="card-body m-0 table-container">
      <input
        type="button"
        id="exportcsv"
        className="btn btn-info btn-sml"
        value="Export 4G-4G"
        onClick={() => console.log('Export to CSV logic')}
        style={{ width: '120px', height: '25px', marginLeft: '0px' }}
      />
      <table id="LNREL" ref={tableRef} className="table-responsive w-100 digital-dashboard-table">
        <thead>
          <tr className="p-0 m-0 font-size-10 color-header">
            {headers.map((header, index) => (
              <th key={index} className="clickable-th vertical-header">
                {header}
              </th>
            ))}
          </tr>
          <tr>
            {headers.map((_, index) => (
              <th key={index}>
                <input type="text" className="search" placeholder=" " style={{ width: '100%' }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="p-0 m-0 font-size-10">
              {headers.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={getConditionalClass(column, row[column], row)}
                  style={{ fontSize: '9px', whiteSpace: 'nowrap' }}
                  data-sort={row[column]}
                >
                  {row[column] === '' ? '-' : row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LTEtoLTE;
