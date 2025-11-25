import { useRef } from 'react';
import Hero from '../components/Hero';
import Catalog from '../components/Catalog';
import AboutUs from '../components/AboutUs'; // 👈 Import the new section

const HomePage = () => {
  const productsRef = useRef('/products/Placeholder.jpg');

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='grid grid-cols-1'>
      {/* Hero Section */}
      <Hero onShopClick={scrollToProducts} />

      {/* Products Section */}
      <div ref={productsRef}>
        <Catalog />
      </div>

      {/* About Us Section */}
      <AboutUs />
    </div>
  );
};

export default HomePage;
