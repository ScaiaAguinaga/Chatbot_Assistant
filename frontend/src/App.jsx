import { useRef } from 'react';
import './App.css';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Footer from './components/Footer';

function App() {
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='grid grid-cols-1 gap-16'>
      {/* Hero Section */}
      <Hero onShopClick={scrollToProducts} />
      {/* Products Section */}
      <div ref={productsRef}>
        <Catalog />
      </div>
    </div>
  );
}

export default App;
