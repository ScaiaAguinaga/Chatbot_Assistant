import React from 'react';

const Hero = ({ onShopClick }) => {
  return (
    <div>
      <div className="w-full h-screen bg-cover bg-center bg-[url('/hero.jpg')] flex items-center justify-center">
        <div className='text-white text-center pl-96'>
          <h1 className='font-bold text-8xl drop-shadow-4xl'>NovaWear</h1>
          <h2 className='text-4xl font-bold my-4'>Future Meets Fashion</h2>
          <button
            onClick={onShopClick}
            className='text-3xl font-bold bg-blue-500 rounded-md py-2 px-4 cursor-pointer flex mx-auto'
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
