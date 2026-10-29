
import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

function Header() {



const [abrir, setAbrir] = useState(false);
const [escuro, setEscuro] = useState(false);
const [compacto, setCompacto] = useState(false);
const [localizacao, setLocalizacao] = useState(false);
const [distancia, setDistancia] = useState("10");








let janela = null;

if (abrir === true) {


  janela = (
    <div
      className="fundo-config"
      onClick={() => setAbrir(false)}
    >
      <div className="modal-config"onClick={(e) => e.stopPropagation()}role="dialog"aria-modal="true" aria-label="Configurações">
        <div className="config-topo">
          <h2>Configurações</h2>

          <button
            type="button"
            className="fechar-config"
            onClick={() => setAbrir(false)}
          >
            X
          </button>
        </div>

  

 
        <h3>Preferências</h3>

      <div className="opcao">
          <label htmlFor="localizacao">Usar minha localização</label>
          <input
id="localizacao"
type="checkbox"
checked={localizacao}
onChange={() => setLocalizacao(!localizacao)}
          />
</div>
        <div className="opcao">
          <label htmlFor="distancia">Distância das doações</label>

<select
            id="distancia"
            value={distancia}
onChange={(e) => setDistancia(e.target.value)}
          >
            <option value="5">5 km</option>
<option value="10">10 km</option>
            <option value="20">20 km</option>
          </select>
</div>

        <h3>Conta</h3>

        <div className="opcao">
          <span>Alterar senha</span>
          <button type="button" className="alterar" disabled>
            Em breve
          </button>
        </div>

        <button type="button" className="sair" disabled>
          Sair da conta
        </button>

      </div>
    </div>
  );
}




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

     <button
  type="button"
  className="config"
  onClick={() => setAbrir(true)}
  aria-label="Abrir configurações"
>
  <img
    src="/assets/images/icons/configVerde.png"
    alt=""
  />
</button>

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
        <Link to="/perfil" className="header-perfil"> <img src="/assets/images/icons/perfil2.png"alt=""/>
         <div className="header-usuario">
            <strong>Nome</strong>
          <span>Pessoa física</span>
          </div>
        </Link>
      </div>
      {janela}
    </header>
  );
}

export default Header;
