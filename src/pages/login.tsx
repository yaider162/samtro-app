import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { usePopup } from "../utils/usePopup";
import { Loading, TriLine } from "../components/Animate";

interface LoginResponse {
  success: boolean;
  message: string;
  username: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const { showPopup, PopupComponent, visible } = usePopup();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (visible) return;
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
      localStorage.setItem("username", response.username);
    }
  };

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
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ingrese su usuario"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium flex  justify-center items-center"
            disabled={visible}
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
