import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Move } from "../utils/props";
import { useProducts } from "./ProductsContext";
import { getLast10Moves } from "../utils/api";

interface MoveContextType {
  moves: Move[];
  actualizeMoves: () => Promise<void>;
}

const MovesContext = createContext<MoveContextType | undefined>(undefined);

export const MovesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [moves, setMoves] = useState<Move[]>([]);
  const {products} = useProducts();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getLast10Moves();
        
        setMoves(data);
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [products]);

  const actualizeMoves = async () => {
    try {
      const data = await getLast10Moves();
      setMoves(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  return (
    <MovesContext.Provider value={{ moves, actualizeMoves }}>
      {children}
    </MovesContext.Provider>
  );
};

export const useMoves = () => {
  const context = useContext(MovesContext);
  if (!context) {
    throw new Error("useMoves debe usarse dentro de un MovesProvider");
  }
  return context;
};
