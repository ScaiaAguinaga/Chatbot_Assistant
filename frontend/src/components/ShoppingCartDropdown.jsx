// src/components/ShoppingCartDropdown.jsx
import React from 'react';
import { FiX } from 'react-icons/fi';

const ShoppingCartDropdown = ({ items, subtotal, onRemove }) => {
  return (
    <div className='absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50'>
      <div className='p-4'>
        <h4 className='text-lg font-semibold mb-3'>Shopping Cart</h4>

        {items.length === 0 ? (
          <p className='text-sm text-gray-500'>Your cart is empty.</p>
        ) : (
          <ul className='space-y-3 max-h-64 overflow-auto pr-1'>
            {items.map((item) => (
              <li key={item.id} className='flex items-center gap-3'>
                {/* Thumbnail */}
                <div className='h-14 w-14 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center'>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className='h-full w-full object-contain'
                    />
                  ) : (
                    <span className='text-xs text-gray-400'>No Image</span>
                  )}
                </div>

                {/* Details */}
                <div className='flex-1'>
                  <p className='text-sm font-medium line-clamp-1'>
                    {item.name}
                  </p>
                  <p className='text-xs text-gray-500'>
                    Qty {item.qty} × ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Line total + remove */}
                <div className='flex flex-col items-end gap-1'>
                  <div className='text-sm font-semibold'>
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                  <button
                    type='button'
                    onClick={() => onRemove(item.id)}
                    className='text-xs text-gray-400 hover:text-red-500'
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <FiX />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='border-t border-gray-200 p-4'>
        <div className='flex items-center justify-between mb-3'>
          <span className='text-sm text-gray-600'>Subtotal</span>
          <span className='text-base font-semibold'>
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className='flex'>
          <button
            type='button'
            className='flex-1 text-center rounded-lg bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700 transition'
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartDropdown;
