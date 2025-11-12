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
import { Product, PageType } from "../utils/props";
import ProductsPage from "../pages/products";
import EntryPage from "./entryStock";
import { CreateProductPage } from "../pages/products";
import { getAllProducts } from "../utils/api";
import { usePopup } from "../utils/usePopup";

interface Movimiento {
  id: number;
  tipo: "Entrada" | "Salida";
  producto: string;
  cantidad: number;
  fecha: string;
  usuario: string;
}

const InventarioARTI: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { showPopup } = usePopup();

  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
      async function fetchProducts() {
        try {
          setProducts(await getAllProducts());
          console.log(products);
          
        } catch (error) {
          showPopup({
            message: "Error al obtener los productos",
            type: "error",
          });
          console.error("Error fetching products:", error);
        }
      }
      fetchProducts();
    }, []);

  const [movimientos, setMovimientos] = useState<Movimiento[]>([
    {
      id: 1,
      tipo: "Entrada",
      producto: "Ácido Hialurónico",
      cantidad: 20,
      fecha: "2025-11-01",
      usuario: "Admin",
    },
    {
      id: 2,
      tipo: "Salida",
      producto: "Botox 100U",
      cantidad: 2,
      fecha: "2025-11-03",
      usuario: "Dr. Hernández",
    },
    {
      id: 3,
      tipo: "Salida",
      producto: "Plasma Rico en Plaquetas",
      cantidad: 1,
      fecha: "2025-11-04",
      usuario: "Dra. Polania",
    },
  ]);

  const DashboardPage: React.FC = () => {
    const productosAlerta = products?.filter((p) => p.stock <= p.minimum);
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
                  ${(valorInventario||0 / 1000000).toFixed(1)}M
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
                <p className="text-gray-500 text-sm mb-1">Movimientos Hoy</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {movimientos.length}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="text-purple-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {productosAlerta?.length||0 > 0 && (
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
            {movimientos
              .slice(-5)
              .reverse()
              .map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center">
                    {m.tipo === "Entrada" ? (
                      <TrendingUp className="text-green-600 mr-3" size={20} />
                    ) : (
                      <TrendingDown className="text-red-600 mr-3" size={20} />
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {m.producto}
                      </p>
                      <p className="text-sm text-gray-600">
                        {m.usuario} • {m.fecha}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      m.tipo === "Entrada"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {m.tipo === "Entrada" ? "+" : "-"}
                    {m.cantidad}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  const RegistrarSalidaPage: React.FC = () => (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Registrar Salida de Stock
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
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">Seleccione un producto</option>
              {products?.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name} (Stock: {p.stock})
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Motivo / Procedimiento
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={3}
              placeholder="Procedimiento o motivo de la salida..."
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
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
            >
              <TrendingDown size={20} className="mr-2" />
              Registrar Salida
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const ReportesPage: React.FC = () => (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reportes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FileText className="text-blue-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Stock Actual
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            Reporte completo del inventario actual
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-3 rounded-lg mr-4">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Alertas</h3>
          </div>
          <p className="text-gray-600 text-sm">Productos bajo stock mínimo</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Movimientos</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Historial de entradas y salidas
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Generar Reporte Personalizado
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Tipo de Reporte
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option>Stock Actual</option>
              <option>Movimientos</option>
              <option>Productos Críticos</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Desde
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Hasta
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
          Generar Reporte
        </button>
      </div>
    </div>
  );

  const Header: React.FC = () => (
    <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Clínica ARTI</h2>
        <p className="text-sm text-gray-600">
          Sistema de Gestión de Inventario
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">Administrador</p>
          <p className="text-xs text-gray-500">admin@clinicaarti.com</p>
        </div>
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "products":
        return (
          <ProductsPage
            setCurrentPage={setCurrentPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        );
      case "create-product":
        return <CreateProductPage setCurrentPage={setCurrentPage} />;
      case "entry":
        return <EntryPage />;
      case "exit":
        return <RegistrarSalidaPage />;
      case "reports":
        return <ReportesPage />;
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
