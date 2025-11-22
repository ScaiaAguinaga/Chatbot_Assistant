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
    <div>
      <nav></nav>
      {/* Hero Section */}
      <Hero onShopClick={scrollToProducts} />
      {/* Products Section */}
      <div ref={productsRef}>
        <Catalog />
      </div>
      <Footer />
    </div>
  );
}

export default App;
