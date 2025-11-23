import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Persisten NavBar */}
      <NavBar />
      {/* Route views */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />

        <Route
          path='*'
          element={<div className='p-8 text-center'>Page not found</div>}
        />
      </Routes>
      {/* Persisten Footer */}
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
