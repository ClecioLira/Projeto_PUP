import { create } from "zustand";

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

// Função auxiliar para salvar no LocalStorage
const saveToLocalStorage = (products: Product[]) => {
  sessionStorage.setItem("products", JSON.stringify(products));
};

// Função auxiliar para recuperar do LocalStorage
const getFromLocalStorage = (): Product[] => {
  const storedProducts = sessionStorage.getItem("products");
  return storedProducts ? JSON.parse(storedProducts) : [];
};

// Criando o Store com Zustand
export const useProductStore = create<ProductStore>((set, get) => ({
  products: getFromLocalStorage(), // Recuperando ao carregar a página

  addProduct: (product) =>
    set((state) => {
      const existingProduct = state.products.find((p) => p.id === product.id);
      let updatedProducts;
      if (existingProduct) {
        updatedProducts = state.products.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        updatedProducts = [...state.products, { ...product, quantity: 1 }];
      }
      saveToLocalStorage(updatedProducts); // Salvando no LocalStorage
      return { products: updatedProducts };
    }),

  removeProduct: (id) =>
    set((state) => {
      const updatedProducts = state.products.filter(
        (product) => product.id !== id
      );
      saveToLocalStorage(updatedProducts); // Salvando no LocalStorage
      return { products: updatedProducts };
    }),

  incrementQuantity: (id) =>
    set((state) => {
      const updatedProducts = state.products.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      );
      saveToLocalStorage(updatedProducts); // Salvando no LocalStorage
      return { products: updatedProducts };
    }),

  decrementQuantity: (id) =>
    set((state) => {
      const updatedProducts = state.products.map((p) =>
        p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
      );
      saveToLocalStorage(updatedProducts); // Salvando no LocalStorage
      return { products: updatedProducts };
    }),

  calculateTotal: () => {
    const products = get().products;
    return products.reduce((total, product) => {
      const price = parseFloat(product.price);
      return total + price * product.quantity;
    }, 0);
  },
}));
