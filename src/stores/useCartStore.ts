import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      isCartOpen: false,
      products: [],
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      addProduct: (product) => set((state) => {
        const existingProduct = state.products.find(p => p.id === product.id);
        
        if (existingProduct) {
          return {
            products: state.products.map(p => 
              p.id === product.id 
                ? { ...p, quantity: p.quantity + 1 } 
                : p
            )
          };
        }
        
        return { 
          products: [...state.products, { ...product, quantity: 1 }] 
        };
      }),
      removeProduct: (productId) => set((state) => ({
        products: state.products.filter(p => p.id !== productId)
      })),
      increaseQuantity: (productId) => set((state) => ({
        products: state.products.map(p => 
          p.id === productId 
            ? { ...p, quantity: p.quantity + 1 } 
            : p
        )
      })),
      decreaseQuantity: (productId) => set((state) => {
        const existingProduct = state.products.find(p => p.id === productId);
        
        if (existingProduct && existingProduct.quantity <= 1) {
          return {
            products: state.products.filter(p => p.id !== productId)
          };
        }
        
        return {
          products: state.products.map(p => 
            p.id === productId 
              ? { ...p, quantity: p.quantity - 1 } 
              : p
          )
        };
      }),
      updateQuantity: (productId, newQuantity) => set((state) => {
        if (newQuantity <= 0) {
          return {
            products: state.products.filter(p => p.id !== productId)
          };
        }
        
        return {
          products: state.products.map(p => 
            p.id === productId 
              ? { ...p, quantity: newQuantity } 
              : p
          )
        };
      }),
      clearCart: () => set({ products: [] }),
    }),
    {
      name: 'cart_store', 
      storage: createJSONStorage(() => localStorage), 
      partialize: (state) => ({ products: state.products }), 
    }
  )
);