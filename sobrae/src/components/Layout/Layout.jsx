
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

import "../../pages/app/App.css";

function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-principal">
        <Header />

        <main className="app-conteudo">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
