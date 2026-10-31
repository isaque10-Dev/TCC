
import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

function Header() {



const [abrir, setAbrir] = useState(false);

const [localizacao, setLocalizacao] = useState(false);
const [distancia, setDistancia] = useState("10");

const [abrirCompartilhar, setAbrirCompartilhar] = useState(false);


const [abrirAvisos, setAbrirAvisos] = useState(false);
const [avisos, setAvisos] = useState([]);

function mostrarAvisos() {
  const salvos = JSON.parse(
    localStorage.getItem("avisosSobrae") || "[]"
  );

  setAvisos(salvos);
  setAbrirAvisos(true);
}

function limparAvisos() {
  localStorage.removeItem("avisosSobrae");
  setAvisos([]);
}

let janelaAvisos = null;

if (abrirAvisos === true) {
  janelaAvisos = (
    <div
      className="notificacoes-fundo"
      onClick={() => setAbrirAvisos(false)}
    >
      <div
        className="notificacoes-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="notificacoes-topo">
          <h2>Notificações</h2>

          <button onClick={() => setAbrirAvisos(false)}>
            X
          </button>
        </div>

        {avisos.length === 0 ? (
          <p>Você não tem notificações no momento.</p>
        ) : (
          <div className="notificacoes-lista">
            {avisos.map((aviso, i) => (
              <div className="notificacao" key={i}>
                <span>🔔</span>
                <p>{aviso}</p>
              </div>
            ))}
          </div>
        )}

        <button
          className="limpar-avisos"
          onClick={limparAvisos}
        >
          Limpar notificações
        </button>
      </div>
    </div>
  );
}





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



const link = window.location.origin + "/doacoes";

function copiarLink() {
  navigator.clipboard.writeText(link)
    .then(() => alert("Link copiado!"))
    .catch(() => alert("Não foi possível copiar o link."));
}

function compartilharWhatsApp() {
  const mensagem = "Conheça o Sobraê e ajude a combater o desperdício! " + link;

  window.open(
    "https://wa.me/?text=" + encodeURIComponent(mensagem),
    "_blank"
  );
}
function compartilharInstagram(){
  const mensagem = "Conheça o Sobraê e ajude a combater o desperdício!" + Link

  window.open(
    "https://www.instagram.com/"
  )
}

function maisOpcoes() {
  if (navigator.share) {
    navigator.share({
      title: "Sobraê",
      text: "Conheça o Sobraê!",
      url: link
    }).catch(() => {});
  } else {
    copiarLink();
  }
}



let janelaCompartilhar = null;

if (abrirCompartilhar === true) {
  janelaCompartilhar = (
    <div
      className="fundo-compartilhar"
      onClick={() => setAbrirCompartilhar(false)}
    >
      <div
        className="modal-compartilhar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="compartilhar-branco">

          <div className="compartilhar-topo">
            <div>
              <h2>Compartilhar</h2>
              <p>
                Ajude a compartilhar essa iniciativa para
                que mais pessoas possam aproveitar!
              </p>
            </div>

            <button onClick={() => setAbrirCompartilhar(false)}>
              X
            </button>
          </div>

          <div className="compartilhar-alimento">
            <img
              src="/assets/images/logo.png"
              alt="logo"
            />

            <div>
              <h3>Compartilhe alimentos</h3>
              <p>Conheça as doações do Sobraê</p>
             <button className="botaodoa" onClick={()=> setAbrirCompartilhar(false)}> <Link to="./doacoes"><span> Doações disponiveis</span></Link></button>
            </div>
          </div>

          <h3 className="compartilhar-titulo">
            Compartilhe com seus amigos!!!
          </h3>

          <p className="compartilhar-descricao">
            Quanto mais pessoas souberem,
            mais alimentos serão aproveitados!
          </p>

          <div className="compartilhar-redes">
           
<button onClick={compartilharWhatsApp}>
  <span className="rede-whatsapp">
    <img
      src="/assets/images/icons/zap.png"
      alt="WhatsApp"
    />
  </span>
  WhatsApp
</button>

<button onClick={compartilharInstagram}>
  <span className="rede-instagram">
    <img
      src="/assets/images/icons/insta.png"
      alt="Instagram"
    />
  </span>
  Instagram
</button>


            <button onClick={copiarLink}>
              <span className="rede-copiar">
                <img src="/assets/images/icons/copy.png" alt=""/>
              </span>
              Copiar link
            </button>

            <button onClick={maisOpcoes}>
              <span className="rede-mais">•••</span>
              Mais opções
            </button>
          </div>

        

        </div>
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


      <div className="header-direita">

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
        
    
<button
  type="button"
  className="header-compartilhar"
  onClick={() => setAbrirCompartilhar(true)}
  title="Compartilhar"
>
  <img
    src="/assets/images/icons/compartilhar.png"
    alt="Compartilhar"
  />
</button>



<button
  type="button"
  className="header-notificacoes"
  onClick={mostrarAvisos}
>
  <img
    src="/assets/images/icons/notific2.png"
    alt="Notificações"
  />
</button>


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

      {janelaAvisos}

      {janelaCompartilhar}
    </header>
  );
}

export default Header;
