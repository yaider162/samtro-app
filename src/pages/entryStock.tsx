import { useEffect, useState } from "react";
import {Product} from "../utils/props";
import { getAllProducts } from "../utils/api";
import { usePopup } from "../utils/usePopup";
import {TrendingUp} from "lucide-react";

export default function EntryPage(){
  const { showPopup } = usePopup();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
      async function fetchProducts() {
        try {
          setProducts(await getAllProducts());
        } catch (error) {
          showPopup({ message: "Error al obtener los productos", type: "error" });
          console.error("Error fetching products:", error);
        }
      }
      fetchProducts();
    }, [])
  return(
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Registrar Entrada de Stock
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        <form
          className="space-y-6"
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Producto *
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Seleccione un producto</option>
              {products.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name} ({p.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Cantidad *
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Fecha *
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Observaciones
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
              placeholder="Notas adicionales sobre esta entrada..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
            >
              <TrendingUp size={20} className="mr-2" />
              Registrar Entrada
            </button>
          </div>
        </form>
      </div>
    </div>)
};