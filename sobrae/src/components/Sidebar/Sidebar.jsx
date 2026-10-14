
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <section className="sidebar">
      <div className="sidebar-logo">
        <h1>Sobraê</h1>
        <p>Painel do usuário</p>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/">Início</NavLink>
        <NavLink to="/mapa">Mapa</NavLink>
        <NavLink to="/doacoes">Doações</NavLink>
        <NavLink to="/interesses">Meus interesses</NavLink>
        <NavLink to="/reservas">Reservas</NavLink>
        <NavLink to="/retiradas">Retiradas</NavLink>
        <NavLink to="/perfil">Perfil</NavLink>
        <NavLink to="/notificacoes">Notificações</NavLink>
        <NavLink to="/configuracoes">Configurações</NavLink>
      </nav>

      <p className="sidebar-footer">
        Juntos contra o desperdício!
      </p>
    </section>
  );
}

export default Sidebar;
