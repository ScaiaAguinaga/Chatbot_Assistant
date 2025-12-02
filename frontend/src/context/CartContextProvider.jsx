import { useEffect, useMemo, useState } from 'react';
import { CartContext } from './CartContext';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    // This runs only once on initial render (lazy initializer)
    if (typeof window === 'undefined') return [];

    try {
      const raw = window.localStorage.getItem('novawear-cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  // Save whenever items change
  useEffect(() => {
    try {
      window.localStorage.setItem('novawear-cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
