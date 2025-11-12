import { useState } from "react";
import {
  Home,
  Package,
  TrendingUp,
  TrendingDown,
  LucideIcon,
  FileText,
  Power,
  X,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageType } from "../utils/props";


interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

type SidebarProps = {
  setCurrentPage: (page: PageType) => void;
    currentPage: PageType;
};

export  function Sidebar({setCurrentPage,currentPage}: SidebarProps) {
    const navigate = useNavigate();
  
    const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showText, setShowText] = useState(true);


  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Panel de Control", icon: Home },
    { id: "products", label: "Productos", icon: Package },
    { id: "entry", label: "Entrada Stock", icon: TrendingUp },
    { id: "exit", label: "Salida Stock", icon: TrendingDown },
    { id: "reports", label: "Reportes", icon: FileText },
  ];

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (sidebarOpen) {
      setShowText(false);
    } else {
      setTimeout(() => {
        setShowText(true);
      }, 190);
    }
  };

  return (
    <div
      className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-[256px]" : "w-[84px]"
      }`}
    >
      <div className="p-6  flex items-center justify-between border-b border-gray-700 ">
        {sidebarOpen && <h2 className="text-xl font-bold">ARTI</h2>}
        <button
          onClick={handleToggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() =>{    setCurrentPage(item.id as PageType);
              }}
              className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all  whitespace-nowrap h-[48px]  ${
                currentPage === item.id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {showText && <span className="ml-3">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-full flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"
        >
          <Power size={20} />
          {showText && <span className="ml-3">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
}
