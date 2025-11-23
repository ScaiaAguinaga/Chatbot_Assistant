import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='bg-blue-500 text-white py-4 shadow-md'>
      <div className='max-w-[1200px] mx-auto px-6 flex justify-between items-center'>
        {/* Brand */}
        <Link to='/' className='text-2xl font-bold tracking-wide'>
          NovaWear
        </Link>

        {/* Nav Links */}
        <div className='flex items-center gap-8 text-lg'>
          <Link
            to='/'
            className='hover:text-gray-200 transition-colors duration-200'
          >
            Home
          </Link>
          <Link
            to='/products'
            className='hover:text-gray-200 transition-colors duration-200'
          >
            Products
          </Link>
          <a
            href='#'
            className='hover:text-gray-200 transition-colors duration-200'
          >
            Shopping Cart
          </a>
        </div>

        {/* Login / Signup */}
        <div>
          <a
            href='#'
            className='bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
          >
            Login / Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
