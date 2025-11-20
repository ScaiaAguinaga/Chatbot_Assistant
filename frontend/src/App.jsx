import { useRef } from 'react';
import './App.css';
import Hero from './components/Hero';

function App() {
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <nav></nav>
      <Hero onShopClick={scrollToProducts} />
      <div ref={productsRef}>
        <h1>Products</h1>
      </div>
    </div>
  );
}

export default App;
