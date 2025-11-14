import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { Product } from "../utils/props";
import { getAllProducts } from "../utils/api";

interface ProductsContextType {
  products: Product[];
  actualizeProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
        console.log(data);
        
    } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

    const actualizeProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  
  return (
    <ProductsContext.Provider value={{ products, actualizeProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe usarse dentro de un ProductsProvider");
  }
  return context;
};
