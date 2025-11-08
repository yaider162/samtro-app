import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Clínica ARTI</h1>
          <p className="text-gray-600 mt-2">Sistema de Gestión de Inventario</p>
        </div>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            navigate("/dashboard");
          }}
        >
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Usuario
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
