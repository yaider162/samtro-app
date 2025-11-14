import {
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";

interface AdminContextType {
  name: string;
  setName: (name: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState<string>("");

  return (
    <AdminContext.Provider
      value={{ name, setName }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin debe usarse dentro de un AdminProvider");
  }
  return context;
};
