import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
};

type ProductStore = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  calculateTotal: () => number;
};

// Criando o Store com persistência automática
export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product) =>
        set((state) => {
          const existingProduct = state.products.find(
            (p) => p.id === product.id
          );
          let updatedProducts;
          if (existingProduct) {
            updatedProducts = state.products.map((p) =>
              p.id === product.id
                ? { ...p, quantity: p.quantity + 1 }
                : p
            );
          } else {
            updatedProducts = [
              ...state.products,
              { ...product, quantity: 1 },
            ];
          }
          return { products: updatedProducts };
        }),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== id
          ),
        })),

      incrementQuantity: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        })),

      decrementQuantity: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id && p.quantity > 1
              ? { ...p, quantity: p.quantity - 1 }
              : p
          ),
        })),

      calculateTotal: () => {
        const products = get().products;
        return products.reduce((total, product) => {
          const price = parseFloat(product.price);
          return total + price * product.quantity;
        }, 0);
      },
    }),
    {
      name: "products-storage", // Nome do localStorage
    }
  )
);
