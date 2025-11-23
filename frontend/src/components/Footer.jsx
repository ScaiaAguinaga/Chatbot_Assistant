import React from 'react';
import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-blue-500 text-gray-300 mt-16 py-12'>
      <div className='max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between gap-8'>
        {/* Brand Info */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold text-white'>NovaWear</h2>
          <p className='text-gray-300 text-sm max-w-sm'>
            Future meets fashion — premium apparel designed for comfort, style,
            and innovation.
          </p>
        </div>

        {/* Navigation Links */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-semibold text-white mb-2'>Explore</h3>
          <a href='/' className='text-gray-300 hover:text-white transition'>
            Collections
          </a>
          <a href='/' className='text-gray-300 hover:text-white transition'>
            About Us
          </a>
          <a href='/' className='text-gray-300 hover:text-white transition'>
            Contact
          </a>
          <a href='/' className='text-gray-300 hover:text-white transition'>
            FAQ
          </a>
        </div>

        {/* Social Links */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-semibold text-white mb-2'>Follow Us</h3>
          <div className='flex gap-4 text-2xl text-gray-300'>
            <a
              href='https://instagram.com'
              className='hover:text-pink-400 transition'
              aria-label='Instagram'
            >
              <FaInstagram />
            </a>
            <a
              href='https://twitter.com'
              className='hover:text-blue-400 transition'
              aria-label='Twitter'
            >
              <FaTwitter />
            </a>
            <a
              href='https://tiktok.com'
              className='hover:text-black transition'
              aria-label='TikTok'
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className='mt-12 border-t-4 border-blue-400/40 pt-6 text-center text-sm text-gray-300'>
        © {new Date().getFullYear()} NovaWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
