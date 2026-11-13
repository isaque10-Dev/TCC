
import { Outlet, useOutletContext } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

import "../../pages/app/App.css";

function Layout() {
  const usuario = useOutletContext();
  return (
    <div className="app-layout">
      <Sidebar administrador={usuario.administrador} />

      <div className="app-principal">
        <Header />

        <main className="app-conteudo">
          <Outlet context={usuario} />
        </main>
      </div>
    </div>
  );
}

export default Layout;
