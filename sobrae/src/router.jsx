
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./pages/app/App";
import Doacoes from "./pages/doacoes";
import Mapa from "./pages/mapa";
import Perfil from "./pages/perfil";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/doacoes" element={<Doacoes />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}
