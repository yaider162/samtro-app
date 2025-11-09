import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import InventarioARTI from "./pages/dashboard";
import { LoginPage } from "./pages/login";

function App() {
//   const [greetMsg, setGreetMsg] = useState("");
//   const [name, setName] = useState("");
//   async function greet() {
//     setGreetMsg(await invoke("greet", { name }));
//   }

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
