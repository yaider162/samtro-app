import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { ProductsProvider } from "./contexts/ProductsContext";
import { MovesProvider } from "./contexts/MovementsContext";
import { AdminProvider } from "./contexts/AdminContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AdminProvider>
      <ProductsProvider>
        <MovesProvider>
          <App />
        </MovesProvider>
      </ProductsProvider>
    </AdminProvider>
  </React.StrictMode>
);
