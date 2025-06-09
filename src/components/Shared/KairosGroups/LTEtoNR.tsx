import React from 'react';

interface LTEtoNRProps {
  site: string;
  date: string;
  data?: any[];
}

const LTEtoNR: React.FC<LTEtoNRProps> = ({ site, date, data = [] }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="lte-to-nr-results">
      <h4>5G-5G Neighbors for Site: <strong>{site}</strong> on <strong>{date}</strong></h4>
      {columns.length > 0 ? (
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              {columns.map(col => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
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
export default LTEtoNR;
