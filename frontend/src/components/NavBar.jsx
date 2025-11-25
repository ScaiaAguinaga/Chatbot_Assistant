import { useMemo, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartDropdown from './ShoppingCartDropdown';

const NavBar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef('/products/Placeholder.jpg');

  // Mock cart items for now
  const cartItems = useMemo(
    () => [
      {
        id: 1,
        name: 'NovaWear Tech Hoodie',
        price: 89.99,
        qty: 1,
        image: '/products/Placeholder.jpg',
      },
      {
        id: 2,
        name: 'AeroShell Rain Jacket',
        price: 129.99,
        qty: 1,
        image: '/products/Placeholder.jpg',
      },
    ],
    []
  );

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

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

          {/* Cart + dropdown */}
          <div className='relative' ref={cartRef}>
            <button
              type='button'
              onClick={() => setCartOpen((o) => !o)}
              className='relative hover:text-gray-200 transition-colors'
            >
              Shopping Cart
              {itemCount > 0 && (
                <span className='ml-2 inline-flex items-center justify-center text-xs font-bold bg-white text-blue-600 rounded-full h-5 min-w-5 px-1'>
                  {itemCount}
                </span>
              )}
            </button>

            {cartOpen && <ShoppingCartDropdown items={cartItems} />}
          </div>
        </div>

        {/* Login / Signup */}
        <div>
          <a
            href='#'
            className='bg-white text-blue-600 font-semibold px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors'
          >
            Login / Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
