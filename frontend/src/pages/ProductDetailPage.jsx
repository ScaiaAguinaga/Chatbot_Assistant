import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const API_BASE_URL = 'http://localhost:5268';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (res.status === 404) {
          setError('Product not found.');
          return;
        }
        if (!res.ok) {
          throw new Error(`Failed to load product: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load product from the server.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image,
    });
  };

  if (loading) {
    return (
      <div className='w-full py-16 text-center'>
        <p className='text-lg text-gray-600'>Loading product…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className='w-full py-16 text-center'>
        <p className='text-lg text-red-500 mb-4'>
          {error ?? 'Product not found.'}
        </p>
        <button
          onClick={() => navigate(-1)}
          className='text-blue-600 hover:underline'
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className='w-full py-10'>
      <div className='max-w-[1000px] mx-auto px-6 md:px-0 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10'>
        {/* Image */}
        <div className='bg-white rounded-xl shadow-md p-4 flex items-center justify-center'>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className='max-h-[420px] w-full object-contain'
            />
          ) : (
            <div className='h-80 w-full flex items-center justify-center bg-gray-100 text-gray-400'>
              No Image Available
            </div>
          )}
        </div>

        {/* Info */}
        <div className='flex flex-col'>
          <Link
            to='/products'
            className='text-sm text-blue-600 hover:underline mb-2'
          >
            ← Back to products
          </Link>

          <h1 className='text-3xl md:text-4xl font-bold mb-2'>
            {product.name}
          </h1>

          <p className='text-xl text-blue-600 font-semibold mb-4'>
            ${product.price}
          </p>

          <p className='text-gray-700 mb-6'>{product.description}</p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className='mb-6'>
              <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2'>
                Tags
              </h3>
              <div className='flex flex-wrap gap-2'>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className='mt-auto flex flex-col gap-3'>
            <button
              onClick={handleAddToCart}
              className='w-full md:w-auto inline-flex justify-center items-center rounded-lg bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
