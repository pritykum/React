import React from 'react';

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

  return (
    <div className="lte-to-lte-results">
      {columns.length > 0 ? (
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ color: 'gray' }}>No neighbor data available</p>
      )}
    </div>
  );
};

export default LTEtoLTE;
