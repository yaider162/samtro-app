import React, { useState } from "react";
import {
  Home,
  Package,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Users,
  FileText,
  Plus,
  Search,
  Edit,
  Power,
  Menu,
  X,
  ChevronRight,
  Calendar,
  DollarSign,
  ShoppingCart,
  LucideIcon,
} from "lucide-react";
import Sidebar from "../components/sidebar";

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  minimo: number;
  precio: number;
  proveedor: string;
}

interface Movimiento {
  id: number;
  tipo: "Entrada" | "Salida";
  producto: string;
  cantidad: number;
  fecha: string;
  usuario: string;
}



type PageType =
  | "dashboard"
  | "productos"
  | "crear-producto"
  | "entrada"
  | "salida"
  | "reportes";

const InventarioARTI: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      codigo: "PRD001",
      nombre: "Ácido Hialurónico",
      categoria: "Insumos Médicos",
      stock: 15,
      minimo: 10,
      precio: 150000,
      proveedor: "MedSupply",
    },
    {
      id: 2,
      codigo: "PRD002",
      nombre: "Botox 100U",
      categoria: "Insumos Médicos",
      stock: 8,
      minimo: 5,
      precio: 450000,
      proveedor: "Allergan",
    },
    {
      id: 3,
      codigo: "PRD003",
      nombre: "Plasma Rico en Plaquetas",
      categoria: "Tratamientos",
      stock: 3,
      minimo: 5,
      precio: 200000,
      proveedor: "BioTech",
    },
    {
      id: 4,
      codigo: "PRD004",
      nombre: "Crema Hidratante Premium",
      categoria: "Productos Estéticos",
      stock: 25,
      minimo: 15,
      precio: 85000,
      proveedor: "CosmeticPro",
    },
  ]);

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
    const productosAlerta = productos.filter((p) => p.stock <= p.minimo);
    const valorInventario = productos.reduce(
      (sum, p) => sum + p.stock * p.precio,
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
                  {productos.length}
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
                  {productosAlerta.length}
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
                  ${(valorInventario / 1000000).toFixed(1)}M
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

        {productosAlerta.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-red-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-red-800">
                Productos con Stock Bajo
              </h3>
            </div>
            <div className="space-y-2">
              {productosAlerta.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{p.nombre}</p>
                    <p className="text-sm text-gray-600">
                      Stock actual: {p.stock} | Mínimo: {p.minimo}
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

  const ProductosPage: React.FC = () => {
    const filteredProductos = productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Productos
          </h1>
          <button
            onClick={() => setCurrentPage("crear-producto")}
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
                  Proveedor
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                    {p.codigo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                    {p.nombre}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {p.categoria}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full font-medium ${
                        p.stock <= p.minimo
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    ${p.precio.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {p.proveedor}
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
  };

  const CrearProductoPage: React.FC = () => (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentPage("productos")}
          className="text-indigo-600 hover:text-indigo-800 mr-4"
        >
          ← Volver
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Nuevo Producto</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <form
          className="space-y-6"
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Código *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="PRD005"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nombre *
              </label>
              <input
                type="text"
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
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Insumos Médicos</option>
                <option>Productos Estéticos</option>
                <option>Tratamientos</option>
                <option>Equipamiento</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Proveedor
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nombre del proveedor"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Precio
              </label>
              <input
                type="number"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Descripción del producto..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setCurrentPage("productos")}
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

  const RegistrarEntradaPage: React.FC = () => (
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
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} ({p.codigo})
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
    </div>
  );

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
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} (Stock: {p.stock})
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
      case "productos":
        return <ProductosPage />;
      case "crear-producto":
        return <CrearProductoPage />;
      case "entrada":
        return <RegistrarEntradaPage />;
      case "salida":
        return <RegistrarSalidaPage />;
      case "reportes":
        return <ReportesPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      <div className="w-full flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">{renderPage()}</main>
      </div>
    </div>
  );
};

export default InventarioARTI;
