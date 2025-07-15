import './pages/NeighborModule.scss';
import NeighborModule from './pages/NeighborModule';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
// import LookAndFeelSidebar from './components/Utilities/LookAndFeelSidebar';




function App() {
  return (
    <PrimeReactProvider>
      {/* <LookAndFeelSidebar side="right" /> */}
      <NeighborModule />
    </PrimeReactProvider>
   );
}
export default App;