import React from 'react';

interface LTEtoNRProps {
  site: string;
  date: string;
  html?: string; 
}

const LTEtoNR: React.FC<LTEtoNRProps> = ({ site, date, html }) => {
  const columns = ['Cell', 'Neighbor', 'Distance', 'RSRP', 'RSRQ', 'PCI', 'EARFCN'];

  return (
    <div className="lte-to-nr-results">
      <h4>4G-5G Neighbors for Site: <strong>{site}</strong> on <strong>{date}</strong></h4>
      {html && html.trim() !== '' ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', color: 'gray' }}>
                No neighbor data available
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LTEtoNR;
