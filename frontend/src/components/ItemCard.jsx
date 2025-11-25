import React from 'react';

const ItemCard = ({
  image = '/products/Placeholder.jpg',
  name = 'NovaWear Clothing Item',
  price = '--.--',
  description = 'Item Description Missing.',
}) => {
  const handleAddToCart = () => {
    console.log(`${name} added to cart`);
  };

  return (
    <div className='group bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-[450px] flex flex-col relative'>
      {/* Add to Cart button (hidden until hover) */}
      <button
        onClick={handleAddToCart}
        className='
          absolute bottom-4 right-4 z-20
          bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-lg
          opacity-0 group-hover:opacity-100
          translate-y-1 group-hover:translate-y-0
          transition-all duration-300
          shadow-md cursor-pointer
        '
      >
        Add to Cart
      </button>

      {/* Image area */}
      <div className='relative h-64 w-full overflow-hidden bg-gray-100'>
        {image ? (
          <img
            src={image}
            alt={name}
            className='h-full w-full object-contain'
          />
        ) : (
          <div className='h-full w-full flex items-center justify-center text-gray-400 text-sm'>
            No Image Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-4 flex-1 flex flex-col'>
        <h3 className='text-lg font-semibold'>{name}</h3>
        <p className='text-sm text-gray-600 mt-1'>{description}</p>
        <div className='mt-auto pt-3 text-xl font-semibold'>${price}</div>
      </div>
    </div>
  );
};

export default ItemCard;
