import { Eye, EyeClosed, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import { useState, useCallback } from "react";
import { usePopup } from "../utils/usePopup";
import { useAdmin } from "../contexts/AdminContext";

interface LoginResponse {
  success: boolean;
  message: string;
  username: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const { showPopup, PopupComponent, visible } = usePopup();
  const {setName}=useAdmin();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = useCallback(async () => {
    if (visible) return;

    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    const response = await invoke<LoginResponse>("login", {
      entry: { username, password },
    });

    if (!response.success) {
      showPopup({
        message: response.message,
        type: "error",
        duration: 4000,
        title: "Acceso denegado",
      });
    } else {
      navigate("/dashboard");
      setName(response.username);
    }
  }, [ navigate, showPopup]);

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
            handleLogin();
          }}
        >
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Usuario
            </label>
            <input
              id="username"
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
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ingrese su contraseña"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? (
                  <Eye size={20} color="blue" />
                ) : (
                  <EyeClosed color="blue" size={20} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={visible}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium flex  justify-center items-center"
          >
            <div className="flex flex-row items-center gap-4 justify-center">
              Iniciar sesion
            </div>
          </button>
        </form>
      </div>
      <PopupComponent />
    </div>
  );
}
