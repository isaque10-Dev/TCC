import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Heart, Clock, CircleHelp, ChevronRight, Pencil, Leaf, LogOut, X } from "lucide-react";
import "./index.css";

function Perfil() {

   const [nome, setNome] = useState("Meu Nome");
  const [email, setEmail] = useState("email@gmail.com");
  const [tipo, setTipo] = useState("Pessoa física");
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(nome);
  const [novoEmail, setNovoEmail] = useState(email);
  const [novoTipo, setNovoTipo] = useState(tipo);
  const [Historico, setHistorico] = useState (false);
  const [Ajuda, setAjuda] = useState (false);


function editarPerfil() {
    setNovoNome(nome);
    setNovoEmail(email);
    setNovoTipo(tipo);
    setEditando(true);
  }

  function salvarPerfil(e) {
    e.preventDefault();
    setNome(novoNome);
    setEmail(novoEmail);
    setTipo(novoTipo);
    setEditando(false);
  }


  return (
     <div>
    <div className="perfil">
      <h1>Meu Perfil</h1>
      <p>Em breve, aqui ficarão as informações do usuário.</p>

      <div className="perfil-conteudo">
        <div className="perfil-esquerda">
          <div className="perfil-usuario">
            <div className="perfil-foto"
>
              <UserRound size={62} />
            </div>

            <div className="perfil-dados">
              <h2>{nome ||  "Meu Nome"}</h2>
              <p>{email || "email@gmail.com"}</p>
              <span className="perfil-tipo"><Leaf size={15} /> {tipo}</span>
            </div>

            <button className="perfil-editar" onClick={editarPerfil}>
              <Pencil size={16} /> Editar Perfil
            </button>
          </div>

          <div className="perfil-impacto">
            <Leaf size={65} />
            <div>
              <h3>Seu impacto até agora</h3>
              <strong>0,0 Kg</strong>
            </div>
            <p>Juntos<br />contra o<br />desperdício!</p>
          </div>
        </div>

        <div className="perfil-opcoes">
          <Link to="/perfil" className="perfil-item" onClick={(e) => { e.preventDefault(); editarPerfil(); }}>
            <span className="perfil-icone"><UserRound /></span>
            <span className="perfil-item-texto"><strong>Meus dados</strong><small>Veja e edite suas informações principais</small></span>
            <ChevronRight />
          </Link>

          <Link to="/doacoes" className="perfil-item">
            <span className="perfil-icone"><Heart /></span>
            <span className="perfil-item-texto"><strong>Minhas doações</strong><small>Acompanhe as doações que você se interessou</small></span>
            <ChevronRight />
          </Link>

          <Link to="/historico" className="perfil-item" onClick={(e) => { e.preventDefault(); setHistorico(true); }}>
    <span className="perfil-icone"><Clock /></span>
    <span className="perfil-item-texto"><strong>Histórico</strong><small>Veja suas retiradas e doações</small></span>
    <ChevronRight />
     </Link>


          <Link to="/ajuda" className="perfil-item" onClick={(e) => { e.preventDefault(); setAjuda(true); }}>
    <span className="perfil-icone perfil-ajuda"><CircleHelp /></span>
    <span className="perfil-item-texto">
        <strong>Ajuda e suporte</strong>
        <small>Tire suas dúvidas ou entre em contato</small>
    </span>
    <ChevronRight />
</Link>


          <Link to="/login" className="perfil-sair"><LogOut size={18} /> Sair da conta</Link>
        </div>
      </div>

     {Historico && (
      <div className="perfil-fundo" onClick={(e) => {if (e.target === e.currentTarget) {setHistorico(false);}}}>
        <div className="perfil-modal">
       <div className="perfil-modal-topo">
                <div>
                    <h2>Histórico</h2>
                    <p>Veja suas retiradas e doações</p>
                </div>
                <button onClick={() => setHistorico(false)} aria-label="Fechar"><X /></button>
            </div>

            <form onSubmit={Historico}>
                <label>
                    Seu histórico de doações aparecerá aqui.
                </label>
            </form>

        </div>
    </div>
)}

{Ajuda && (
  <div className="perfil-fundo" onClick={(e) => {if (e.target === e.currentTarget) {setAjuda(false);}}}>
    <div className="perfil-modal">
     <div className="perfil-modal-topo">
        <div>
          <h2>Ajuda e suporte</h2>
          <p>Como podemos ajudar você?</p>
        </div>

        <button onClick={() => setAjuda(false)}>
          <X />
        </button>
      </div>

      <div className="ajuda-conteudo">

        <h3>Perguntas frequentes</h3>
        <br/>
        <div className="ajuda-item">
          <strong>Como posso receber uma doação?</strong>
          <br/>
          <p>
            Acesse a área de doações, escolha um alimento
            disponível e demonstre seu interesse.
          </p>
          <br/>
        </div>

        <div className="ajuda-item">
          <strong>Como acompanho minhas doações?</strong>
          <br/>
          <p>
            Acesse "Minhas doações" para visualizar
            as doações nas quais você demonstrou interesse.
          </p>
          <br/>
        </div>

        <div className="ajuda-item">
          <strong>Como funciona a retirada?</strong>
          <br/>
          <p>
            Após demonstrar interesse, siga as informações
            de retirada disponibilizadas pelo estabelecimento.
          </p>
          <br/>
        </div>

        <div className="ajuda-item">
          <strong>Como posso editar meus dados?</strong>
          <br/>
          <p>
            Na tela de perfil, clique em "Editar Perfil"
            para atualizar suas informações.
          </p>
          <br/>
        </div>

        <div className="ajuda-contato">
          <div>
            <strong>Ainda precisa de ajuda?</strong>
            <br/>
            <p>Entre em contato com nossa equipe de suporte.</p>
            <p></p>
            <br/>
          </div>
        </div>

      </div>

    </div>
  </div>
)}

      {editando && (
        <div className="perfil-fundo" onClick={(e) => { if (e.target === e.currentTarget) setEditando(false); }}>
          <div className="perfil-modal">
            <div className="perfil-modal-topo">
              <div>
                <h2>Editar perfil</h2>
                <p>Altere os dados da sua conta.</p>
              </div>
              <button onClick={() => setEditando(false)} aria-label="Fechar">< X /></button>
            </div>

            <form onSubmit={salvarPerfil}>
              <label>Nome
                <input value={novoNome} onChange={(e) => setNovoNome(e.target.value)} required />
              </label>
              <label>E-mail
                <input type="email" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} required />
              </label>
              <label>Tipo de conta
                <select value={novoTipo} onChange={(e) => setNovoTipo(e.target.value)}>
                  <option>Pessoa física</option>
                  <option>Empresa</option>
                </select>
              </label>
              <div className="perfil-modal-botoes">
                <button type="button" onClick={() => setEditando(false)}>Cancelar</button>
                <button type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
      </div>

      
  );
}

export default Perfil;
