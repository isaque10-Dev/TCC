
import { Link } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {


  
  return (
    <section className="sidebar">
      
<div className="sidebar-logo">
  <img src="/assets/images/logo.png" alt="Sobraê" />

  <div>
    <h1>Sobra<span>ê  </span></h1>
    <p>Painel do usuário</p>
  </div>
</div>


<nav className="sidebar-menu">
  <Link to="/">
    <img src="/assets/images/icons/home.png" alt="" />
    Início
  </Link>

  <Link to="/atividades">
    <img src="/assets/images/icons/ativi.png" alt="" />
    Minhas Atividades
  </Link>

  <Link to="/doacoes">
    <img src="/assets/images/icons/coracao.png" alt="" />
    Doações
  </Link>

  <Link to="/perfil">
    <img src="/assets/images/icons/perfil.png" alt="" />
    Perfil
  </Link>


 
</nav>

      <p className="sidebar-footer">
        Juntos contra o desperdício!
      </p>
    </section>
  );
}

export default Sidebar;
