import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Heart,
  Clock,
  CircleHelp,
  ChevronRight,
  Pencil,
  Leaf,
  LogOut,
  X,
} from "lucide-react";
import api, { mensagemDaApi } from "../services/api";
import "./index.css";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [historico, setHistorico] = useState(false);
  const [ajuda, setAjuda] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [novoDocumento, setNovoDocumento] = useState("");
  const [resumo, setResumo] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [saindo, setSaindo] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function carregarPerfil() {
    try {
      const resposta = await api.get("/perfil");
      setUsuario(resposta.data);
      localStorage.setItem("sobraeUsuario", JSON.stringify(resposta.data));
      const dados = await api.get("/atividades/resumo");
      setResumo(dados.data);
    } catch (error) {
      setErro(mensagemDaApi(error, "Não foi possível carregar o perfil."));
    }
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  function editarPerfil() {
    setNovoNome(usuario.nome || "");
    setNovoEmail(usuario.email || "");
    setNovoTelefone(usuario.num_telefone || "");
    setNovoDocumento(
      (usuario.tipo === "empresa" ? usuario.cnpj_empresa : usuario.cpf) || "",
    );
    setSenhaAtual("");
    setErro("");
    setEditando(true);
  }

  async function salvarPerfil(e) {
    e.preventDefault();
    if (salvando) return;
    setSalvando(true);
    setErro("");
    const dados = { nome: novoNome, num_telefone: novoTelefone };
    if (usuario.tipo === "empresa") dados.cnpj_empresa = novoDocumento;
    else dados.cpf = novoDocumento;
    if (novoEmail !== usuario.email) {
      dados.email = novoEmail;
      dados.senha_atual = senhaAtual;
    }
    try {
      const resposta = await api.patch("/perfil", dados);
      setUsuario(resposta.data);
      localStorage.setItem("sobraeUsuario", JSON.stringify(resposta.data));
      setEditando(false);
    } catch (error) {
      setErro(mensagemDaApi(error, "Não foi possível salvar o perfil."));
    } finally {
      setSalvando(false);
    }
  }

  async function sair() {
    if (saindo) return;
    setSaindo(true);
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("sobraeToken");
    localStorage.removeItem("sobraeUsuario");
    navigate("/login", { replace: true });
  }

  if (!usuario)
    return (
      <div className="perfil">
        <h1>Meu Perfil</h1>
        <p>{erro || "Carregando perfil..."}</p>
      </div>
    );
  const tipo = usuario.tipo === "empresa" ? "Empresa" : "Pessoa física";

  return (
    <div>
      <div className="perfil">
        <h1>Meu Perfil</h1>
        <p>Veja e altere as informações da sua conta.</p>
        {erro && !editando && (
          <p role="alert" className="perfil-erro">
            {erro}
          </p>
        )}
        <div className="perfil-conteudo">
          <div className="perfil-esquerda">
            <div className="perfil-usuario">
              <div className="perfil-foto">
                <UserRound size={62} />
              </div>
              <div className="perfil-dados">
                <h2>{usuario.nome}</h2>
                <p>{usuario.email}</p>
                <span className="perfil-tipo">
                  <Leaf size={15} /> {tipo}
                </span>
              </div>
              <button className="perfil-editar" onClick={editarPerfil}>
                <Pencil size={16} /> Editar Perfil
              </button>
            </div>
            <div className="perfil-impacto">
              <Leaf size={52} />
              <div>
                <h3>Seu impacto até agora</h3>
                <strong>
                  {resumo
                    ? Number(resumo.impacto_kg).toLocaleString("pt-BR", {
                        maximumFractionDigits: 2,
                      }) + " kg"
                    : "—"}
                </strong>
                <small>
                  Alimentos entregues em doações medidas em kg ou g.
                </small>
              </div>
            </div>
          </div>
          <div className="perfil-opcoes">
            <button className="perfil-item" onClick={editarPerfil}>
              <span className="perfil-icone">
                <UserRound />
              </span>
              <span className="perfil-item-texto">
                <strong>Meus dados</strong>
                <small>Veja e edite suas informações principais</small>
              </span>
              <ChevronRight />
            </button>
            <Link to="/atividades" className="perfil-item">
              <span className="perfil-icone">
                <Heart />
              </span>
              <span className="perfil-item-texto">
                <strong>Minhas doações</strong>
                <small>Acompanhe doações e reservas</small>
              </span>
              <ChevronRight />
            </Link>
            <button className="perfil-item" onClick={() => setHistorico(true)}>
              <span className="perfil-icone">
                <Clock />
              </span>
              <span className="perfil-item-texto">
                <strong>Histórico</strong>
                <small>Veja suas retiradas e doações</small>
              </span>
              <ChevronRight />
            </button>
            <button className="perfil-item" onClick={() => setAjuda(true)}>
              <span className="perfil-icone perfil-ajuda">
                <CircleHelp />
              </span>
              <span className="perfil-item-texto">
                <strong>Ajuda e suporte</strong>
                <small>Tire suas dúvidas</small>
              </span>
              <ChevronRight />
            </button>
            <button
              type="button"
              className="perfil-sair"
              onClick={sair}
              disabled={saindo}
            >
              <LogOut size={18} /> {saindo ? "Saindo..." : "Sair da conta"}
            </button>
          </div>
        </div>

        {historico && (
          <div className="perfil-fundo" onClick={() => setHistorico(false)}>
            <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
              <div className="perfil-modal-topo">
                <div>
                  <h2>Histórico</h2>
                  <p>Suas doações e reservas ficam em Minhas Atividades.</p>
                </div>
                <button onClick={() => setHistorico(false)}>
                  <X />
                </button>
              </div>
              <Link to="/atividades">Abrir minhas atividades</Link>
            </div>
          </div>
        )}
        {ajuda && (
          <div className="perfil-fundo" onClick={() => setAjuda(false)}>
            <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
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
                <p>
                  Para reservar, escolha uma doação disponível e confirme a
                  solicitação.
                </p>
                <p>Para aprovar pedidos recebidos, acesse Minhas Atividades.</p>
              </div>
            </div>
          </div>
        )}
        {editando && (
          <div className="perfil-fundo" onClick={() => setEditando(false)}>
            <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
              <div className="perfil-modal-topo">
                <div>
                  <h2>Editar perfil</h2>
                  <p>Altere os dados da sua conta.</p>
                </div>
                <button onClick={() => setEditando(false)}>
                  <X />
                </button>
              </div>
              <form onSubmit={salvarPerfil}>
                <label>
                  Nome
                  <input
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    required
                  />
                </label>
                <label>
                  E-mail
                  <input
                    type="email"
                    value={novoEmail}
                    onChange={(e) => setNovoEmail(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Telefone
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="(11) 99999-9999"
                    maxLength={20}
                    value={novoTelefone}
                    onChange={(e) => setNovoTelefone(e.target.value)}
                  />
                </label>
                <label>
                  {usuario.tipo === "empresa" ? "CNPJ" : "CPF (opcional)"}
                  <input
                    inputMode="numeric"
                    maxLength={18}
                    value={novoDocumento}
                    onChange={(e) => setNovoDocumento(e.target.value)}
                    required={usuario.tipo === "empresa"}
                  />
                </label>
                {novoEmail !== usuario.email && (
                  <label>
                    Senha atual
                    <input
                      type="password"
                      value={senhaAtual}
                      onChange={(e) => setSenhaAtual(e.target.value)}
                      required
                    />
                  </label>
                )}
                {erro && (
                  <p role="alert" style={{ color: "red" }}>
                    {erro}
                  </p>
                )}
                <div className="perfil-modal-botoes">
                  <button
                    type="button"
                    disabled={salvando}
                    onClick={() => setEditando(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" disabled={salvando}>
                    {salvando ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
