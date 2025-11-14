import React, { useState, useEffect } from "react";
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  FileText,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Product, PageType, Move } from "../utils/props";
import ProductsPage from "../pages/products/products";
import EntryPage from "./entryStock";
import ExitPage from "./exitStock";
import CreateProductPage from "../pages/products/createProduct";
import ReportsPage from "./reports";
import EditProductPage from "./products/editProduct";
import { useMoves } from "../contexts/MovementsContext";
import { useProducts } from "../contexts/ProductsContext";
import { Header } from "../components/Header";

const InventarioARTI: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const { products } = useProducts();
  const { moves, actualizeMoves } = useMoves();
  const [movesWithNames, setMovesWithNames] = useState<Move[]>(
    moves.map((move) => ({
      ...move,
      name: products.find((product) => product.code === move.product_code)
        ?.name,
    }))
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [amount, SetAmount] = useState<number>(0);
  useEffect( () => {
     actualizeMoves();
    localStorage.getItem("amount") &&
      SetAmount(Number(localStorage.getItem("amount")));
  }, [currentPage]);
  useEffect(() => {
    setMovesWithNames(
      moves.map((move) => ({
        ...move,
        name: products.find((product) => product.code === move.product_code)
          ?.name,
      }))
    );
  }, [moves]);

  const DashboardPage: React.FC = () => {
    const productosAlerta = products?.filter((p) => p.stock < p.minimum);
    const valorInventario = products?.reduce(
      (sum, p) => sum + p.stock * p.price,
      0
    );

    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Panel de Control
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Productos</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {products?.length}
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Alertas de Stock</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {productosAlerta?.length}
                </h3>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="text-red-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Valor Inventario</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  ${((valorInventario || 0) / 1000000).toFixed(1)}M
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="text-green-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">
                  Movimientos Sesion Actual
                </p>
                <h3 className="text-3xl font-bold text-gray-800">{amount}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="text-purple-600" size={28} />
              </div>
            </div>
          </div>
        </div>
        {productosAlerta && productosAlerta.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-red-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-red-800">
                Productos con Stock Bajo
              </h3>
            </div>
            <div className="space-y-2">
              {productosAlerta?.map((p) => (
                <div
                  key={p.code}
                  className="bg-white p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{p.name}</p>
                    <p className="text-sm text-gray-600">
                      Stock actual: {p.stock} | Mínimo: {p.minimum}
                    </p>
                  </div>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    Reabastecer
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Últimos Movimientos
          </h3>
          <div className="space-y-3">
            {movesWithNames
              .slice(-5)
              .reverse()
              .map((m, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center">
                    {m.type_move === "entry" ? (
                      <TrendingUp className="text-green-600 mr-3" size={20} />
                    ) : (
                      <TrendingDown className="text-red-600 mr-3" size={20} />
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">{m.name}</p>
                      <p className="text-sm text-gray-600">{m.date}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      m.type_move === "entry"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {m.type_move === "entry" ? "+" : ""}
                    {m.stock}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "products":
        return (
          <ProductsPage
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
          />
        );
      case "create-product":
        return <CreateProductPage setCurrentPage={setCurrentPage} />;
      case "entry":
        return <EntryPage setCurrentPage={setCurrentPage} />;
      case "exit":
        return <ExitPage setCurrentPage={setCurrentPage} />;
      case "edit-product":
        return (
          <EditProductPage
            setCurrentPage={setCurrentPage}
            productCode={
              selectedProduct || {
                code: "",
                name: "",
                category: "",
                stock: 0,
                minimum: 0,
                price: 0,
                description: "",
                active: true,
              }
            }
          />
        );
      case "reports":
        return <ReportsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <div className="w-full flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">{renderPage()}</main>
      </div>
    </div>
  );
};

export default InventarioARTI;
