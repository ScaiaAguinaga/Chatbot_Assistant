// src/components/Catalog.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

const API_BASE_URL = 'http://localhost:5268'; // backend URL

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (!res.ok) {
          throw new Error(`Failed to load products: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load products from the server.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center py-16">
        <p className="text-lg text-gray-600">Loading products…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-16">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  const visibleProducts = products.slice(0, 6);

  return (
    <div>
      <h2 className="text-6xl font-bold text-center pb-16">Collections</h2>

      <div className="w-[1200px] mx-auto grid grid-cols-3 gap-8">
        {visibleProducts.map((item) => (
          <ItemCard
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            tags={item.tags}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="w-full flex justify-center mt-8">
        <Link
          to="/products"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
