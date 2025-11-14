import { PageType, Product } from "../../utils/props.tsx";
import { useState } from "react";
import {  updateProduct } from "../../utils/api.tsx";
import { usePopup } from "../../utils/usePopup.tsx";
import { useProducts } from "../../contexts/ProductsContext.tsx";
import { useConfirmation } from "../../utils/useConfirmation.tsx";

interface Props {
  setCurrentPage: (page: PageType) => void;
  productCode: Product;
}

export default function EditProductPage({
  setCurrentPage,
  productCode,
}: Props) {
  const { showPopup, PopupComponent , visible} = usePopup();
  const { products, actualizeProducts } = useProducts();
  const { showConfirmation, ConfirmationComponent } = useConfirmation();

  const [product, setProduct] = useState<Product>({
    code: productCode.code,
    name: productCode.name,
    category: productCode.category,
    stock: productCode.stock,
    minimum: productCode.minimum,
    price: productCode.price,
    description: productCode.description,
    active: true,
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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!products.find((p: Product) => p.code === product.code)) {
      showPopup({
        message: "No existe un producto con ese codigo",
        duration: 3000,
        type: "warning",
      });
      return;
    }
    showConfirmation({
      title: "Guardar producto",
      message: `¿Estas seguro de actualizar el producto !*#${product.code}!*# ?`,
      onConfirm: handleSaveProduct,
    });
  };

  const handleSaveProduct = async () => {
    try {
      const formatted = {
        ...product,
        stock: parseInt(product.stock.toString()),
        minimum: parseInt(product.minimum.toString()),
        price: parseInt(product.price.toString()),
      };

      const response = await updateProduct(formatted);
      

      if (response === "Producto actualizado con exito") {
       await  actualizeProducts();
        localStorage.setItem(
          "amount",
          (Number(localStorage.getItem("amount") || 0) + 1).toString()
        );
        showPopup({
          message: "Producto actualizado con exito",
          duration: 3000,
          type: "success",
          title: "Producto Actualizado",
        });
      } else {
        showPopup({
          message: "Informacion erronea",
          duration: 3000,
          title: "Producto no agregado",
          type: "warning",
        });
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
        <h1 className="text-3xl font-bold text-gray-800">Editar Producto</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <form className="space-y-6" onSubmit={handleSend}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Código
              </label>
              <input
                type="text"
                name="code"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                readOnly
                value={productCode.code}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nombre <span className="text-red-300">*</span>
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
                Categoría <span className="text-red-300">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="category"
                value={product.category}
                onChange={handleProduct}
                required
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
                Precio <span className="text-red-300">*</span>
              </label>
              <input
                type="number"
                name="price"
                required
                min={0}
                value={product.price}
                onChange={handleProduct}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Stock Actual
              </label>
              <input
                type="number"
                name="stock"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                readOnly
                value={product.stock}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nivel Mínimo <span className="text-red-300">*</span>
              </label>
              <input
                type="number"
                min={1}
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
              disabled={visible}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
      <PopupComponent />
      <ConfirmationComponent />
    </div>
  );
}
