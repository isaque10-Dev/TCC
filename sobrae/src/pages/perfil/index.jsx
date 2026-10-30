import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Heart, Clock, Bell, ShieldCheck, CircleHelp, ChevronRight, Pencil, Leaf, LogOut, X } from "lucide-react";
import "./index.css";

function Perfil() {

   const [nome, setNome] = useState("Meu Nome");
  const [email, setEmail] = useState("email@gmail.com");
  const [tipo, setTipo] = useState("Pessoa física");
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(nome);
  const [novoEmail, setNovoEmail] = useState(email);
  const [novoTipo, setNovoTipo] = useState(tipo);



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
            <div className="perfil-foto">
              <UserRound size={62} />
            </div>

            <div className="perfil-dados">
              <h2>{nome || "Meu Nome"}</h2>
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
              <strong>37,5 Kg</strong>
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

          <Link to="/historico" className="perfil-item">
            <span className="perfil-icone"><Clock /></span>
            <span className="perfil-item-texto"><strong>Histórico</strong><small>Veja suas retiradas e doações</small></span>
            <ChevronRight />
          </Link>

          <Link to="/notificacoes" className="perfil-item">
            <span className="perfil-icone"><Bell /></span>
            <span className="perfil-item-texto"><strong>Notificações</strong><small>Configure suas preferências de notificação</small></span>
            <ChevronRight />
          </Link>

          <Link to="/privacidade" className="perfil-item">
            <span className="perfil-icone"><ShieldCheck /></span>
            <span className="perfil-item-texto"><strong>Privacidade e segurança</strong><small>Gerencie sua conta e dados</small></span>
            <ChevronRight />
          </Link>

          <Link to="/ajuda" className="perfil-item">
            <span className="perfil-icone perfil-ajuda"><CircleHelp /></span>
            <span className="perfil-item-texto"><strong>Ajuda e suporte</strong><small>Tire suas dúvidas ou entre em contato</small></span>
            <ChevronRight />
          </Link>

          <Link to="/login" className="perfil-sair"><LogOut size={18} /> Sair da conta</Link>
        </div>
      </div>

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
