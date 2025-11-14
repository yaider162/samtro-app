import { useAdmin } from "../contexts/AdminContext";

export function Header(){
    const {name}=useAdmin();

    return (<div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Clínica ARTI</h2>
        <p className="text-sm text-gray-600">
          Sistema de Gestión de Inventario
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">Administrador</p>
          <p className="text-xs text-gray-500">{name}</p>
        </div>
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}