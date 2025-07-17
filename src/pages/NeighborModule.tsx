import React, { useState, useEffect }from 'react';
import './NeighborModule.scss';
import { AutoComplete } from 'primereact/autocomplete';
import LTEtoLTE from "../components/Shared/KairosGroups/LTEtoLTE";
import NRtoNR from "../components/Shared/KairosGroups/NRtoNR";
import LTEtoNR from "../components/Shared/KairosGroups/LTEtoNR";
import LookAndFeelSidebar from "../components/Utilities/LookAndFeelSidebar";
import { apiService } from '../api/ApiService';



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
// const [setApiPrefix, setApiPrefix] = useState<string>(''); 

  // Example static site list — replace with API results if needed
// const siteList = ['4BGS014A', '5TC0614A', '5TC0702A', '7NYR098B', '8LKA123A'];

//  useEffect(() => {
//     axios.get('/api/sites')
//       .then((res) => {
//         const sites = res.data.site_list;
//         setSiteList(sites);
//       })
//       .catch((err) => {
//         console.error("Error fetching site list: ", err.message);
//       });
//   }, []);
  useEffect(() => {
    apiService.getSiteList()
      .then((sites) => setSiteList(sites))
      .catch((err) => console.error('Error fetching site list: ', err));
  }, []);

  // useEffect(() => {
  //   axios.get('/api/get_config')
  //     .then((res) => {
  //       setApiPrefix(res.data.endpoint_addon || '');
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching config:", err.message);
  //     });
  // }, []);
//   useEffect(() => {
//   axios.get('/api/get_config')
//     .then((res) => {
//       // prepend host + port for local dev
//       const basePath = res.data.endpoint_addon || '';
//       const backendHost = 'http://localhost:5000';  // or from environment variable
//       setApiPrefix(`${backendHost}${basePath}`);
//     })
//     .catch((err) => {
//       console.error("Error fetching config:", err.message);
//     });
// }, []);


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
      apiService.getNrToNrAudit(siteName, date),
      apiService.getLteToNrAudit(siteName, date),
    apiService.getLteToLteAudit(siteName, date),
]);
   
      setTabHtml({
        '5G-5G': res5g5g,
        '4G-5G': res4g5g,
        '4G-4G': res4g4g,
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
        <div className="theme-toggle-container">
          <LookAndFeelSidebar side='right'/>
        </div>
        
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