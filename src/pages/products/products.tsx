import { Search, XCircle, Plus, Edit2 } from "lucide-react";
import { PageType, Product } from "../../utils/props.tsx";
import { useEffect, useState } from "react";
import { usePopup } from "../../utils/usePopup.tsx";
import { useProducts } from "../../contexts/ProductsContext.tsx";
import Button from "../../components/Button.tsx";
import { disableProduct } from "../../utils/api.tsx";
import { useConfirmation } from "../../utils/useConfirmation.tsx";
interface Props {
  setCurrentPage: (page: PageType) => void;
  setSelectedProduct: (product: Product) => void;
}

export default function ProductsPage({
  setCurrentPage,
  setSelectedProduct,
}: Props) {
  const { showPopup, PopupComponent } = usePopup();
  const { showConfirmation, ConfirmationComponent } = useConfirmation();
  const { products , actualizeProducts} = useProducts();


  const [searchedProducts, setSearchedProducts] = useState<Product[]>(products);

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm === "") {
      setSearchedProducts(products);
      return;
    }
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedProducts(filteredProducts);
  }, [searchTerm, products]);

  const handleSend=async(code:string)=>{
    try {
          await disableProduct(code);
          await actualizeProducts();
        } catch (error) {
          console.error(error);
        }
  }

  const handleInactiveProduct = (product: Product) => {
    showConfirmation({
      title: "Desactivar Producto",
      message: `¿Desea desactivar el producto !*#${product.name}!*# con identificador !*#${product.code}!*#?`,
      onConfirm:()=>handleSend(product.code),
      color: "red",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestión de Productos
        </h1>
        <Button
          type="submit"
          color="blue"
          onClick={() => setCurrentPage("create-product")}
        >
          <div className="flex items-center ">
            <Plus size={20} className="mr-2" />
            Nuevo Producto
          </div>
        </Button>
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
            {searchedProducts.map((p) => (
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
                      p.stock < p.minimum
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
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setCurrentPage("edit-product");
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 border border-blue-200 hover:border-blue-300"
                      title="Editar producto"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => handleInactiveProduct(p)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200 hover:border-red-300"
                      title="Inactivar producto"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationComponent />
      <PopupComponent />
    </div>
  );
}
