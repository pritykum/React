import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import {PrimeReactProvider} from "primereact/api"
import {HashRouter} from "react-router-dom";

// Apply saved theme immediately on page load to avoid FOUC
// const savedTheme = localStorage.getItem('app-theme-path') || 'nokia-light';
// const themeLink = document.getElementById('theme-link');
// if (themeLink) {
//   themeLink.setAttribute('href', `themes/${savedTheme}/theme.css`);
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
        <HashRouter>
            <App />
        </HashRouter>
    </PrimeReactProvider>
  </StrictMode>
)
