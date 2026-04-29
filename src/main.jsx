import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import favIcon from './assets/fav.png';
import './index.css';
import App from './App.jsx';

const faviconLink = document.querySelector("link[rel='icon']") || (() => {
  const link = document.createElement('link');
  link.rel = 'icon';
  document.head.appendChild(link);
  return link;
})();

faviconLink.href = favIcon;

// Mount the React app into the single root element defined by index.html.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);