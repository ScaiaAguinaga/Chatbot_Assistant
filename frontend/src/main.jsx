import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContextProvider.jsx';

import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        {/* Persisten NavBar */}
        <NavBar />
        {/* Route views */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/product/:id' element={<ProductDetailPage />} />
          <Route
            path='*'
            element={<div className='p-8 text-center'>Page not found</div>}
          />
        </Routes>
        {/* Persisten Footer */}
        <Footer />
        {/* AI Chat Widget */}
        {/* <ChatWidget /> */}
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
