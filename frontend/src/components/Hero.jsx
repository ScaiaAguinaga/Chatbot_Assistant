import React from 'react';

const Hero = ({ onShopClick }) => {
  return (
    <div>
      <div className="w-full h-screen bg-cover bg-center bg-[url('/hero.jpg')] flex items-center justify-center">
        <div className='text-white text-center pl-96'>
          <h1 className='font-bold text-8xl drop-shadow-2xl'>NovaWear</h1>
          <p className='text-2xl mt-2 mb-4 drop-shadow-2xl'>
            Where tomorrow's style is made today.
          </p>
          <button
            onClick={onShopClick}
            className='text-3xl font-bold bg-blue-400 hover:bg-blue-500 rounded-md py-2 px-4 cursor-pointer flex mx-auto'
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
