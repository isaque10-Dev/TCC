
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-pesquisa">
        <img
          src="/assets/images/icons/pesquisa.png"
          alt=""
        />
        <input
          type="text"
          placeholder="Buscar por doações, alimentos, empresas, instituições..."
        />
      </div>

      <div className="Config">
        <Link to='/configuracoes' className="header-config">
        <img src="./assets/images/icons/configVerde.png" alt="Configuracoes"/>
        
        </Link>
      </div>

      <div className="header-direita">
        <Link to="/notificacoes" className="header-notificacoes">
          <img
            src="/assets/images/icons/notific2.png"
            alt="Notificações"
          />
        </Link>

<Link to="/login" className="entrar-login">
  <img src="/assets/images/icons/perfil.png" alt="" />

  <div>
    <strong>Entrar</strong>
    <p>Criar ou acessar conta</p>
  </div>
</Link>
        <Link to="/perfil" className="header-perfil">
          <img
            src="/assets/images/icons/perfil2.png"
            alt=""
          />
          <div className="header-usuario">
            <strong>Nome</strong>
            <span>Pessoa física</span>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
