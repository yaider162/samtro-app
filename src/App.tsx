import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventarioARTI from "./pages/dashboard";
import { LoginPage } from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<LoginPage />} />
        <Route path="/dashboard" element={<InventarioARTI />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
