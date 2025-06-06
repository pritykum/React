import React, { useState } from 'react';
import axios from 'axios';
import './components/NeighborModule.css';

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('5G-5G');
  const [siteName, setSiteName] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [tabHtml, setTabHtml] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!siteName || !date) {
      alert('Please enter both Site and Date values.');
      return;
    }

    setIsLoading(true);

    try {
      const [res5g5g, res4g5g, res4g4g] = await Promise.all([
        axios.get('/api/neighborAudit/nrTonr', {
          params: { selected_site: siteName, raml_date: date },
        }),
        axios.get('/api/neighborAudit/lteTonr', {
          params: { selected_site: siteName, raml_date: date },
        }),
        axios.get('/api/neighborAudit/ltetolte', {
          params: { selected_site: siteName, raml_date: date },
        }),
      ]);

      setTabHtml({
        '5G-5G': res5g5g.data.html_result || '<p>Error loading 5G-5G data.</p>',
        '4G-5G': res4g5g.data.html_result || '<p>Error loading 4G-5G data.</p>',
        '4G-4G': res4g4g.data.html_result || '<p>Error loading 4G-4G data.</p>',
      });
    } catch (error) {
      console.error('Error fetching neighbor audit data:', error);
      alert('Error fetching data. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="neighbor-container">
      <div className="top-bar">
        <label>Site: </label>
        <input
          type="text"
          placeholder="Start typing..."
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />

        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="submit-button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>

        <span className="cm-date">
          CM & PM Date: <strong>{new Date(date).toLocaleDateString()}</strong>
        </span>
      </div>

      <div className="tab-bar">
        {['5G-5G', '4G-5G', '4G-4G'].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="result-box">
        {!siteName ? (
          <div className="no-site">Select any site from above menu to see result</div>
        ) : isLoading ? (
          <div className="loading">Loading data...</div>
        ) : (
          <div
            className="results"
            dangerouslySetInnerHTML={{ __html: tabHtml[selectedTab] || '<p>No data loaded.</p>' }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
