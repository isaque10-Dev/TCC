
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import App from "./pages/app/App";
import Doacoes from "./pages/doacoes/index";
import Mapa from "./pages/mapa/index";
import Perfil from "./pages/perfil/index";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/doacoes" element={<Doacoes />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
