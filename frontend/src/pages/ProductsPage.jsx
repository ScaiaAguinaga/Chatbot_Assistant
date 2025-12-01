import { useEffect, useMemo, useState } from 'react';
import ItemCard from '../components/ItemCard';

const API_BASE_URL = 'http://localhost:5268';

// Price range filters
const PRICE_RANGES = [
  { id: 'any', label: 'Any price', min: 0, max: Number.POSITIVE_INFINITY },
  { id: 'under50', label: 'Under $50', min: 0, max: 50 },
  { id: '50to100', label: '$50 – $100', min: 50, max: 100 },
  { id: '100to200', label: '$100 – $200', min: 100, max: 200 },
  { id: '200plus', label: '$200+', min: 200, max: Number.POSITIVE_INFINITY },
];

// Seasonal filters
const SEASONS = ['summer', 'spring', 'winter', 'fall'];

export default function ProductsPage() {
  // products from backend
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filter state
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [priceRangeId, setPriceRangeId] = useState('any');

  // fetch products on mount
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

  // price range selection
  const priceRange = useMemo(
    () => PRICE_RANGES.find((r) => r.id === priceRangeId) ?? PRICE_RANGES[0],
    [priceRangeId]
  );

  // filter products from backend
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // season filter
      const hasSeasons = selectedSeasons.length > 0;
      const seasonMatch = hasSeasons
        ? (p.tags || []).some((tag) =>
            selectedSeasons.includes(String(tag).toLowerCase())
          )
        : true;

      // price filter
      const price = Number(p.price ?? 0);
      const inRange = price >= priceRange.min && price < priceRange.max;

      return seasonMatch && inRange;
    });
  }, [products, selectedSeasons, priceRange]);

  // reset filters
  const clearFilters = () => {
    setSelectedSeasons([]);
    setPriceRangeId('any');
  };

  // toggle season selection
  const toggleSeason = (season) => {
    setSelectedSeasons((prev) =>
      prev.includes(season)
        ? prev.filter((s) => s !== season)
        : [...prev, season]
    );
  };

  // loading / error states
  if (loading) {
    return (
      <div className='w-full py-16 text-center'>
        <p className='text-lg text-gray-600'>Loading products…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full py-16 text-center'>
        <p className='text-lg text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='w-full py-8'>
      {/* Page header */}
      <div className='max-w-[1200px] mx-auto px-6 md:px-0'>
        <h1 className='text-6xl font-bold text-center pb-8'>All Products</h1>
      </div>

      {/* Layout: sidebar + catalog */}
      <div className='max-w-[1200px] mx-auto px-6 md:px-0 grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-8'>
        {/* Sidebar */}
        <aside className='bg-white/50 rounded-xl p-4 border border-gray-200 h-fit md:sticky md:top-24'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold'>Filters</h2>
            <button
              onClick={clearFilters}
              className='text-sm text-blue-600 hover:underline'
            >
              Clear
            </button>
          </div>

          {/* Season filter */}
          <div className='mb-6'>
            <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2'>
              Season
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              {SEASONS.map((season) => (
                <label
                  key={season}
                  className='flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100'
                >
                  <input
                    type='checkbox'
                    className='accent-blue-600'
                    checked={selectedSeasons.includes(season)}
                    onChange={() => toggleSeason(season)}
                  />
                  <span className='capitalize'>{season}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <div className='mb-2'>
            <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2'>
              Price
            </h3>
            <div className='flex flex-col gap-2'>
              {PRICE_RANGES.map((range) => (
                <label
                  key={range.id}
                  className='flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100'
                >
                  <input
                    type='radio'
                    name='priceRange'
                    className='accent-blue-600'
                    checked={priceRangeId === range.id}
                    onChange={() => setPriceRangeId(range.id)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Catalog */}
        <section>
          <div className='flex items-baseline justify-between mb-4'>
            <p className='text-gray-600 text-sm'>
              Showing{' '}
              <span className='font-semibold'>{filteredProducts.length}</span>{' '}
              of <span className='font-semibold'>{products.length}</span>{' '}
              products
            </p>
          </div>

          {/* Big catalog grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredProducts.map((item) => (
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
        </section>
      </div>
    </div>
  );
}
