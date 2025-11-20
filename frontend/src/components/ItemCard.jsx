import React from 'react';

const ItemCard = ({
  image = null,
  name = 'NovaWear Clothing Item',
  price = '--.--',
  description = 'Item Description Missing.',
}) => {
  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-[450px] flex flex-col'>
      {/* Fixed-height media area so the card size is the same with/without an image */}
      <div className='relative h-64 w-full overflow-hidden bg-gray-100'>
        {image ? (
          <img src={image} alt={name} className='h-full w-full object-cover' />
        ) : (
          <div className='h-full w-full flex items-center justify-center text-gray-400 text-sm'>
            No Image Available
          </div>
        )}
      </div>

      {/* Content area */}
      <div className='p-4 flex-1 flex flex-col'>
        <h3 className='text-lg font-semibold'>{name}</h3>
        <p className='text-sm text-gray-600 mt-1'>{description}</p>
        <div className='mt-auto pt-3 text-xl font-semibold'>${price}</div>
      </div>
    </div>
  );
};

export default ItemCard;
