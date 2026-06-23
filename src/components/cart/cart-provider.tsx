"use client"

import React, { createContext, useContext, useState } from 'react';

export type ProductSize = '125ml' | '250ml' | '500ml' | '50g' | '100g' | '250g';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: ProductSize;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, size: ProductSize) => void;
  updateQuantity: (id: string, size: ProductSize, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === newItem.id && i.size === newItem.size);
      if (existing) {
        return prev.map(i => 
          (i.id === newItem.id && i.size === newItem.size) 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, size: ProductSize) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  const updateQuantity = (id: string, size: ProductSize, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setItems(prev => prev.map(i => 
      (i.id === id && i.size === size) ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => {
    let sizeMultiplier = 1;
    // Sauce size multipliers
    if (i.size === '250ml') sizeMultiplier = 1.8;
    if (i.size === '500ml') sizeMultiplier = 3.2;
    // Spice size multipliers
    if (i.size === '100g') sizeMultiplier = 1.7;
    if (i.size === '250g') sizeMultiplier = 3.5;
    
    return acc + (i.price * sizeMultiplier * i.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalItems, 
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
