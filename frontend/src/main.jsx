import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Site Navigation Bar */}
    <NavBar />
    <App />
    {/* Site Footer */}
    <Footer />
  </StrictMode>
);
