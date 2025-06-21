import React, { useState, useEffect }from 'react';
import axios from 'axios';
import './NeighborModule.scss';
import { AutoComplete } from 'primereact/autocomplete';
import LTEtoLTE from "../components/Shared/KairosGroups/LTEtoLTE";
import NRtoNR from "../components/Shared/KairosGroups/NRtoNR";
import LTEtoNR from "../components/Shared/KairosGroups/LTEtoNR";


const NeighborModule: React.FC = () => {
const [selectedTab, setSelectedTab] = useState<string>('5G-5G');
const [filteredSites, setFilteredSites] = useState<string[]>([]);
const [siteList, setSiteList] = useState<string[]>([]); // <-- NEW
const [siteName, setSiteName] = useState<string>('');
const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
// const [tabHtml, setTabHtml] = useState<{ [key: string]: any[] }>({});
const [tabHtml, setTabHtml] = useState<{
  [key: string]: {
    columns: string[];
    data: any[];
  };
}>({});
const [isLoading, setIsLoading] = useState<boolean>(false);
const [submittedSite, setSubmittedSite] = useState<string>('');
const [submittedDate, setSubmittedDate] = useState<string>('');
const [submitted, setSubmitted] = useState<boolean>(false);
const [apiPrefix, setApiPrefix] = useState<string>(''); 

  // Example static site list — replace with API results if needed
// const siteList = ['4BGS014A', '5TC0614A', '5TC0702A', '7NYR098B', '8LKA123A'];

 useEffect(() => {
    axios.get('/api/sites')
      .then((res) => {
        const sites = res.data.site_list;
        setSiteList(sites);
      })
      .catch((err) => {
        console.error("Error fetching site list: ", err.message);
      });
  }, []);

  useEffect(() => {
    axios.get('/api/get_config')
      .then((res) => {
        setApiPrefix(res.data.endpoint_addon || '');
      })
      .catch((err) => {
        console.error("Error fetching config:", err.message);
      });
  }, []);

  const searchSite = (event: { query: string }) => {
    const query = event.query.toLowerCase();
    const filtered = siteList.filter(site => site.toLowerCase().includes(query));
    setFilteredSites(filtered);
  };

  const handleSubmit = async () => {
    if (!siteName || !date) {
      alert('Please enter both Site and Date values.');
      return;
    }

    setIsLoading(true);
    setSubmitted(false);

    try {
      const [res5g5g, res4g5g, res4g4g] = await Promise.all([
        axios.get(`${apiPrefix}/api/neighborAudit/nrTonr`, {
          params: { selected_site: siteName, raml_date: date },
        }),
        axios.get(`${apiPrefix}/api/neighborAudit/lteTonr`, {
          params: { selected_site: siteName, raml_date: date },
        }),
        axios.get(`${apiPrefix}/api/neighborAudit/ltetolte`, {
          params: { selected_site: siteName, raml_date: date },
        }),
      ]);

      setTabHtml({
        '5G-5G': {
          columns: res5g5g.data.columns || [],
          data: res5g5g.data.data || [],
        },
        '4G-5G': {
          columns: res4g5g.data.columns || [],
          data: res4g5g.data.data || [],
        },
        '4G-4G': {
          columns: res4g4g.data.columns || [],
          data: res4g4g.data.data || [],
        },
      });

      setSubmittedSite(siteName);
      setSubmittedDate(date);
      setSubmitted(true);
    } catch (error) {
      console.error('Error fetching neighbor audit data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="neighbor-container">
      <div className="top-bar">
        <label htmlFor="site">Site: </label>
        <AutoComplete
          inputId="site"
          value={siteName}
          suggestions={filteredSites}
          completeMethod={searchSite}
          onChange={(e) => setSiteName(e.value)}
          placeholder="Start typing..."
          dropdown
          virtualScrollerOptions={{ itemSize: 30 }}
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
        {!submitted && !isLoading ? (
          <div className="no-site">Please select a site and date, then click Submit to see results.</div>
        ) : isLoading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        ) : selectedTab === '5G-5G' ? (
          <NRtoNR site={submittedSite} date={submittedDate} data={tabHtml['5G-5G']} />
        ) : selectedTab === '4G-5G' ? (
          <LTEtoNR site={submittedSite} date={submittedDate} data={tabHtml['4G-5G']} />
        ) : selectedTab === '4G-4G' ? (
          <LTEtoLTE site={submittedSite} date={submittedDate} data={tabHtml['4G-4G']} />
        ) : (
          <div className="results" dangerouslySetInnerHTML={{ __html: '<p>No data loaded.</p>' }} />
        )}
      </div>
    </div>
  );
};

export default NeighborModule;