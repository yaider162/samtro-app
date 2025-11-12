import { Search, Edit, Plus } from "lucide-react";
import { PageType, Product } from "../utils/props.tsx";
import { useEffect, useState } from "react";
import { addProduct, getAllProducts } from "../utils/api.tsx";
import { usePopup } from "../utils/usePopup.tsx";

interface Props {
  setCurrentPage: (page: PageType) => void;
  searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

export default function ProductsPage({
  setCurrentPage,
  searchTerm,
  setSearchTerm,
}: Props) {
  const { showPopup } = usePopup();
  const [productos, setProductos] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        setProductos(await getAllProducts());
      } catch (error) {
        showPopup({ message: "Error al obtener los productos", type: "error" });
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestión de Productos
        </h1>
        <button
          onClick={() => setCurrentPage("create-product")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre o código..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Código
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Nombre
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Categoría
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Precio
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.code} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                  {p.code}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                  {p.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {p.category}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
                      p.stock <= p.minimum
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  ${p.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <button className="text-indigo-600 hover:text-indigo-800 mr-3">
                    <Edit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CreateProductPage({
  setCurrentPage,
}: {
  setCurrentPage: (page: PageType) => void;
}) {
  const { showPopup } = usePopup();

  const [product, setProduct] = useState<Product>({
    code: "",
    name: "",
    category: "",
    stock: 0,
    minimum: 0,
    price: 0,
    description: "",
  });

  const handleProduct = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(product);
      const formatted = {...product,stock:parseInt(product.stock.toString()),minimum:parseInt(product.minimum.toString()),price:parseInt(product.price.toString())};
      console.log(formatted);
      
      const response = await addProduct(formatted);
      console.log(response,"aca");
      
      if(response.succes){
        showPopup({message:"Producto agregado",duration:3000,type:"success"});
      }else{
        showPopup({message:"Producto no agregado",duration:3000,type:"warning"});
      }
    } catch (error) {
      showPopup({ message: "Error al obtener los productos", type: "error" });
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentPage("products")}
          className="text-indigo-600 hover:text-indigo-800 mr-4"
        >
          ← Volver
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Nuevo Producto</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <form className="space-y-6" onSubmit={handleSaveProduct}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Código *
              </label>
              <input
                type="text"
                name="code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="PRDXXX"
                required
                value={product.code}
                onChange={handleProduct}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleProduct}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nombre del producto"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Categoría *
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="category"
                value={product.category}
                onChange={handleProduct}
              >
                <option>Insumos Médicos</option>
                <option>Productos Estéticos</option>
                <option>Tratamientos</option>
                <option>Equipamiento</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Precio
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleProduct}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Stock Inicial
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleProduct}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nivel Mínimo *
              </label>
              <input
                type="number"
                name="minimum"
                value={product.minimum}
                onChange={handleProduct}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleProduct}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Descripción del producto..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setCurrentPage("products")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
