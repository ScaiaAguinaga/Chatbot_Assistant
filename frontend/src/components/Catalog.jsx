import products from '../data/products';
import ItemCard from '../components/ItemCard';

export default function Catalog() {
  return (
    <div>
      <h2 className='text-6xl font-bold text-center pb-16'>Collections</h2>

      <div className='w-[1200px] mx-auto grid grid-cols-3 gap-8'>
        {products.slice(0, 6).map((item) => (
          <ItemCard
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            tags={item.tags}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className='w-full flex justify-center mt-8'>
        <a
          href='/products'
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors'
        >
          View All
        </a>
      </div>
    </div>
  );
}
