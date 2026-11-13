import { useEffect, useState } from "react";
import api, { mensagemDaApi } from "../services/api";
import "./index.css";

export default function Atividades() {
  const [aba, setAba] = useState("doacoes");
  const [doacoes, setDoacoes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [recebidas, setRecebidas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [quantidadeEditada, setQuantidadeEditada] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  async function carregarDados() {
    try {
      const respostas = await Promise.all([
        api.get("/doacoes/minhas?limite=100"),
        api.get("/solicitacoes?limite=100"),
        api.get("/solicitacoes?recebidas=true&limite=100")
      ]);
      setDoacoes(respostas[0].data);
      setReservas(respostas[1].data);
      setRecebidas(respostas[2].data);
      setErro("");
    } catch (error) {
      console.log(error);
      setErro(mensagemDaApi(error, "Não foi possível carregar suas atividades."));
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { carregarDados(); }, []);

  function abrirEdicao(item) {
    setEditando(item);
    setNomeEditado(item.nome);
    setQuantidadeEditada(item.quantidade);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    try {
      await api.put("/doacoes/" + editando.id_doacao, { nome: nomeEditado, quantidade: quantidadeEditada });
      setEditando(null);
      carregarDados();
    } catch (error) {
      setErro(mensagemDaApi(error, "Não foi possível editar a doação."));
    }
  }

  async function excluirDoacao(id) {
    if (!window.confirm("Deseja cancelar esta doação?")) return;
    try {
      await api.delete("/doacoes/" + id);
      carregarDados();
    } catch (error) {
      setErro(mensagemDaApi(error, "Não foi possível cancelar a doação."));
    }
  }

  async function alterarReserva(id, status) {
    try {
      await api.patch("/solicitacoes/" + id + "/status", { status });
      carregarDados();
    } catch (error) {
      setErro(mensagemDaApi(error, "Não foi possível atualizar a reserva."));
    }
  }

  return <div className="atividades">
    <h1>Minhas Atividades</h1>
    <p>Gerencie suas doações e acompanhe suas reservas.</p>
    {erro && <p style={{ color: "red" }}>{erro}</p>}

    <div className="resumo">
      <div className="quadrado"><h3>Minhas doações</h3><h1>{doacoes.length}</h1><p>Doações publicadas</p></div>
      <div className="quadrado"><h3>Minhas reservas</h3><h1>{reservas.length}</h1><p>Solicitações realizadas</p></div>
      <div className="quadrado"><h3>Pedidos recebidos</h3><h1>{recebidas.filter((item) => item.status === "pendente").length}</h1><p>Aguardando resposta</p></div>
    </div>

    <div className="botoes">
      <button className={aba === "doacoes" ? "ativo" : ""} onClick={() => setAba("doacoes")}>Minhas doações</button>
      <button className={aba === "reservas" ? "ativo" : ""} onClick={() => setAba("reservas")}>Minhas reservas</button>
      <button className={aba === "recebidas" ? "ativo" : ""} onClick={() => setAba("recebidas")}>Pedidos recebidos</button>
    </div>
    {carregando && <p>Carregando atividades...</p>}

    {!carregando && aba === "doacoes" && <div className="lista-atividades">
      {doacoes.length === 0 && <div className="item"><p>Você ainda não publicou nenhuma doação.</p></div>}
      {doacoes.map((item) => <div className="item" key={item.id_doacao}>
        <h3>{item.nome}</h3><p>Categoria: {item.categoria}</p><p>Quantidade: {item.quantidade} {item.unidade}</p><p>Validade: {item.validade}</p><p>Retirada: {item.local_retirada}</p><p>Status: {item.situacao}</p>
        {item.status === "disponivel" && <><button onClick={() => abrirEdicao(item)}>Editar</button><button onClick={() => excluirDoacao(item.id_doacao)}>Cancelar</button></>}
      </div>)}
    </div>}

    {!carregando && aba === "reservas" && <div className="lista-atividades">
      {reservas.length === 0 && <div className="item"><p>Você ainda não solicitou nenhuma doação.</p></div>}
      {reservas.map((item) => <div className="item" key={item.id_solicitacao}>
        <h3>{item.nome}</h3><p>Quantidade: {item.quantidade} {item.unidade}</p><p>Local: {item.local_retirada}</p><p>Status: {item.status}</p>
        {(item.status === "pendente" || item.status === "aprovada") && <button onClick={() => alterarReserva(item.id_solicitacao, "cancelada")}>Cancelar solicitação</button>}
      </div>)}
    </div>}

    {!carregando && aba === "recebidas" && <div className="lista-atividades">
      {recebidas.length === 0 && <div className="item"><p>Você ainda não recebeu solicitações.</p></div>}
      {recebidas.map((item) => <div className="item" key={item.id_solicitacao}>
        <h3>{item.nome}</h3><p>Solicitante: {item.solicitante}</p><p>Quantidade: {item.quantidade} {item.unidade}</p><p>Status: {item.status}</p>
        {item.status === "pendente" && <><button onClick={() => alterarReserva(item.id_solicitacao, "aprovada")}>Aprovar</button><button onClick={() => alterarReserva(item.id_solicitacao, "recusada")}>Recusar</button></>}
        {item.status === "aprovada" && <button onClick={() => alterarReserva(item.id_solicitacao, "concluida")}>Confirmar retirada</button>}
      </div>)}
    </div>}

    {editando && <div className="gerenciar-fundo" onClick={() => setEditando(null)}><div className="gerenciar-modal" onClick={(e) => e.stopPropagation()}>
      <h2>Editar doação</h2><form onSubmit={salvarEdicao}>
        <label>Nome do alimento</label><input value={nomeEditado} onChange={(e) => setNomeEditado(e.target.value)} required />
        <label>Quantidade</label><input value={quantidadeEditada} onChange={(e) => setQuantidadeEditada(e.target.value)} required />
        <div className="gerenciar-botoes"><button type="button" onClick={() => setEditando(null)}>Cancelar</button><button type="submit">Salvar</button></div>
      </form>
    </div></div>}
  </div>;
}
