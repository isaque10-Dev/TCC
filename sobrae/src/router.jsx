
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RotaProtegida, { RotaAdmin } from "./components/RotaProtegida";

import Layout from "./components/Layout/Layout";
import App from "./pages/app/App";
import Doacoes from "./pages/doacoes/index";
import Atividades from "./pages/atividades/index";
import Perfil from "./pages/perfil/index";
import Login from "./pages/login/index.jsx";
import Cadastro from "./pages/cadastro/index.jsx";
import Error from "./pages/error/index.jsx";
import Admin from "./pages/admin/index.jsx";
import "./responsivo.css";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/cadastro" element={<Cadastro />} />
  <Route path="*" element={<Error />} />




  
  <Route element={<RotaProtegida />}>
  <Route element={<Layout />}>
  
    <Route path="/App" element={<App />} />
    <Route path="/atividades" element={<Atividades />} />
    <Route path="/doacoes" element={<Doacoes />} />
    <Route path="/perfil" element={<Perfil />} />
    <Route element={<RotaAdmin />}>
      <Route path="/admin" element={<Admin />} />
    </Route>
  </Route>
  </Route>
</Routes>
    </BrowserRouter>
  );
}
