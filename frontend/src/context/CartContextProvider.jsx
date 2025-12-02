import { useEffect, useMemo, useState } from 'react';
import { CartContext } from './CartContext';

// Provides cart state and actions to all child components
export function CartProvider({ children }) {
  // Initialize cart items from localStorage (runs once on mount)
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return [];

    try {
      const raw = window.localStorage.getItem('novawear-cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem('novawear-cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  // Add an item to the cart or increment its quantity
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

  // Remove an item from the cart by ID
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => setItems([]);

  // Total number of items (sum of quantities)
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  // Total cart value
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  // Value exposed to all cart consumers
  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    itemCount,
    subtotal,
  };

  // Provide cart context to children
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
