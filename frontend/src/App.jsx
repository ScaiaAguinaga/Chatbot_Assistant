import { useRef } from 'react';
import './App.css';
import Hero from './components/Hero';
import Catalog from './components/Catalog';

function App() {
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <nav></nav>
      {/* Hero Section */}
      <Hero onShopClick={scrollToProducts} />
      {/* Products Section */}
      <div ref={productsRef}>
        <h2 className='text-6xl font-bold text-center py-8'>Collections</h2>
        {/* Items catalog */}
        <Catalog />
      </div>
    </div>
  );
}

export default App;
