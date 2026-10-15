
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import App from "./pages/app/App";
import Doacoes from "./pages/doacoes/index";
import Mapa from "./pages/mapa/index";
import Perfil from "./pages/perfil/index";
import Login from "./pages/login/index.jsx";
import Cadastro from "./pages/cadastro/index.jsx";
import Error from "./pages/error/index.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/cadastro" element={<Cadastro />} />
  <Route path="*" element={<Error />} />



  
  <Route element={<Layout />}>
  
    <Route path="/" element={<App />} />
    <Route path="/mapa" element={<Mapa />} />
    <Route path="/doacoes" element={<Doacoes />} />
    <Route path="/perfil" element={<Perfil />} />
  </Route>
</Routes>
    </BrowserRouter>
  );
}
