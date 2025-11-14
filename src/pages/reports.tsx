import { AlertCircle, FileText,Calendar} from "lucide-react";

export default function ReportsPage() {
  return (
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
}
