import React from 'react';

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

  return (
    <div className="lte-to-lte-results">
      {columns.length > 0 ? (
        <div className="scroll-container">
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                {columns.map(col => <th key={col}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {rowData.map((row, idx) => (
                <tr key={idx}>
                  {columns.map(col => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : (
          <p style={{ color: 'gray' }}>No neighbor data available</p>
        )}
      </div>
  );
};

export default NRtoNR;
