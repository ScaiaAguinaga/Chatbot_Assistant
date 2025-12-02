import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import ShoppingCartDropdown from './ShoppingCartDropdown';
import { useCart } from '../hooks/useCart';

const NavBar = () => {
  const { items, itemCount, subtotal, removeFromCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);
  const location = useLocation();

  // Close dropdown on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className='bg-blue-500 text-white py-4 shadow-md'>
      <div className='max-w-[1200px] mx-auto px-6 flex justify-between items-center'>
        {/* Brand */}
        <Link to='/' className='text-2xl font-bold tracking-wide'>
          NovaWear
        </Link>

        {/* Links */}
        <div className='flex items-center gap-6 text-lg'>
          <Link to='/' className='hover:text-gray-200 transition-colors'>
            Home
          </Link>
          <Link
            to='/products'
            className='hover:text-gray-200 transition-colors'
          >
            Products
          </Link>
        </div>

        {/* Cart icon + dropdown */}
        <div className='relative' ref={cartRef}>
          <button
            type='button'
            onClick={() => setCartOpen((o) => !o)}
            className='relative hover:text-gray-200 transition-colors flex items-center'
            aria-label='Open shopping cart'
          >
            <FiShoppingCart size={22} />
            {itemCount > 0 && (
              <span className='ml-1 inline-flex items-center justify-center text-xs font-bold bg-white text-blue-600 rounded-full h-5 min-w-5 px-1'>
                {itemCount}
              </span>
            )}
          </button>

          {cartOpen && (
            <ShoppingCartDropdown
              items={items}
              subtotal={subtotal}
              onRemove={removeFromCart}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
