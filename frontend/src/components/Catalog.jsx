import products from '../data/products';
import ItemCard from '../components/ItemCard';

export default function Catalog() {
  return (
    <div>
      {' '}
      <h2 className='text-6xl font-bold text-center pb-8'>Collections</h2>
      <div className='w-[1200px] mx-auto grid grid-cols-3 gap-8'>
        {products.map((item) => (
          <ItemCard
            key={item.id}
            image={item.image} // may be null → your ItemCard placeholder will show
            name={item.name}
            price={item.price}
            description={item.description}
            tags={item.tags}
          />
        ))}
      </div>
    </div>
  );
}
