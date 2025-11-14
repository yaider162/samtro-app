import { useEffect, useState } from "react";
import { Product } from "../utils/props";
import { usePopup } from "../utils/usePopup";
import { useConfirmation } from "../utils/useConfirmation";
import { TrendingDown, Search } from "lucide-react";
import { useProducts } from "../contexts/ProductsContext";
import Button from "../components/Button";
import { PageType } from "../utils/props";
import Calendar from "../components/Calendar";
import { removeStock } from "../utils/api";
import { useMoves } from "../contexts/MovementsContext";
interface Props {
  setCurrentPage: (page: PageType) => void;
}

export default function ExitPage({ setCurrentPage }: Props) {
  const { showPopup, PopupComponent, visible: popupVisible } = usePopup();
  const {
    showConfirmation,
    ConfirmationComponent,
    visible: confirmationVisible,
  } = useConfirmation();
  
  const { products, actualizeProducts } = useProducts();

  const [searchedProducts, setSearchedProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
//   const [stockDate, setStockDate] = useState<Date | null>(new Date());

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const product = products.find((p) => p.code === code) || null;
    setSelectedProduct(product);
  };

  const handleSend = async (amount: number) => {
    try {
      if (!selectedProduct) {
        showPopup({
          message: "Por favor, selecciona un producto.",
          type: "warning",
        });
        return;
      }
      

      const response = await removeStock(selectedProduct.code, amount);
      if (response) {
        showPopup({
          message: "Salida de stock realizada con éxito",
          title: "Exito salida de stock",
          type: "success",
        });
        setSelectedProduct(null);
        setSearchTerm("");
        // setStockDate(new Date());
        await actualizeProducts();
        localStorage.setItem("amount", (Number(localStorage.getItem("amount")||0) + 1).toString());
      } else {
        showPopup({
          message: "Error al realizar la salida de stock",
          title: "Error salida de stock",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const stock = parseInt(
        (document.getElementById("cantidad-stock") as HTMLInputElement).value
    );
    if((selectedProduct?.stock||0) < stock){
        showPopup({
            message: "No hay suficiente stock para realizar la salida",
            title: "Error salida de stock",
            type: "warning",
        });
        return;
    }
    const message: string = `¿Estás seguro de realizar la salida de !*#${stock}!*# unidad${
      stock == 1 ? "" : "es"
    } del producto !*#${selectedProduct?.name}!*#?`;
    const title: string = `Confirmar Salida de Stock`;
    showConfirmation({
      title,
      message,
      onConfirm: () => {
        handleSend(stock);
        const form = e.target as HTMLFormElement;
        form.reset();
      },
      color: "red",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Registrar Salida de Stock
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        <form className="space-y-6" onSubmit={handleEntry}>
          <div className="flex flex-row justify-between">
            <div className=" w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Buscar Producto <span className="text-red-300">*</span>
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar por nombre o código..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/2 ml-8">
              <label className="block text-gray-700 font-medium mb-2">
                Producto <span className="text-red-300">*</span>
              </label>
              <select
                onChange={handleSelectChange}
                required
                className="w-full h-[50px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {!searchedProducts || searchedProducts.length === 0 ? (
                  <option value="">Sin Coincidencias</option>
                ) : (
                  <option value="">Seleccione un producto</option>
                )}
                {searchedProducts.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedProduct && (
            <section className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Producto seleccionado
              </h3>
              <p className="text-gray-700">
                <span className="font-medium">Nombre:</span>{" "}
                {selectedProduct.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Código:</span>{" "}
                {selectedProduct.code}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Stock actual:</span>{" "}
                {selectedProduct.stock}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Stock mínimo:</span>{" "}
                {selectedProduct.minimum}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Precio unitario:</span> $
                {selectedProduct.price.toLocaleString()}
              </p>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Cantidad <span className="text-red-300">*</span>
              </label>
              <input
                type="number"
                id="cantidad-stock"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0"
                min="1"
                required
              />
            </div>
            
            {/*TODO Por implementar fechas en backend
             <div>
              <label className="block text-gray-700 font-medium mb-2">
                Fecha <span className="text-red-300">*</span>
              </label>
              <Calendar date={stockDate || new Date()} setDate={setStockDate} />
            </div> */}
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
            <Button onClick={() => setCurrentPage("dashboard")}>
              <div>Cancelar</div>
            </Button>
            <Button
              type="submit"
              color="red"
              disabled={popupVisible || confirmationVisible}
            >
              <div className="flex items-center ">
                <TrendingDown size={20} className="mr-2" />
                Registrar Salida
              </div>
            </Button>
          </div>
        </form>
      </div>
      <PopupComponent />
      <ConfirmationComponent />
    </div>
  );
}
