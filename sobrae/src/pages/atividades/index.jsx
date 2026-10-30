
import { useState } from "react";
import "./index.css";

export default function Atividades() {
  const [aba, setAba] = useState("doacoes");

  const [doacoes, setDoacoes] = useState(
    JSON.parse(localStorage.getItem("minhasDoacoes") || "[]")
  );

  const [editando, setEditando] = useState(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [quantidadeEditada, setQuantidadeEditada] = useState("");

  const frutas = localStorage.getItem("reservaFrutas");
  const paes = localStorage.getItem("reservaPaes");

  function abrirEdicao(item) {
    setEditando(item.id);
    setNomeEditado(item.nome);
    setQuantidadeEditada(item.quantidade);
  }

  function salvarEdicao(e) {
    e.preventDefault();

    const atualizadas = doacoes.map((item) => {
      if (item.id === editando) {
        return {
          ...item,
          nome: nomeEditado,
          quantidade: quantidadeEditada
        };
      }

      return item;
    });

    setDoacoes(atualizadas);

    localStorage.setItem(
      "minhasDoacoes",
      JSON.stringify(atualizadas)
    );

    setEditando(null);
  }

  function excluirDoacao(id) {
    if (window.confirm("Deseja excluir esta doação?")) {
      const atualizadas = doacoes.filter(
        (item) => item.id !== id
      );

      setDoacoes(atualizadas);

      localStorage.setItem(
        "minhasDoacoes",
        JSON.stringify(atualizadas)
      );
    }
  }

  let janela = null;

  if (editando !== null) {
    janela = (
      <div
        className="gerenciar-fundo"
        onClick={() => setEditando(null)}
      >
        <div
          className="gerenciar-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Editar doação</h2>

          <form onSubmit={salvarEdicao}>
            <label>Nome do alimento</label>
            <input
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
              required
            />

            <label>Quantidade</label>
            <input
              value={quantidadeEditada}
              onChange={(e) => setQuantidadeEditada(e.target.value)}
              required
            />

            <div className="gerenciar-botoes">
              <button
                type="button"
                onClick={() => setEditando(null)}
              >
                Cancelar
              </button>

              <button type="submit">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="atividades">
      <h1>Minhas Atividades</h1>
      <p>Gerencie suas doações e acompanhe suas reservas.</p>

      <div className="resumo">
        <div className="quadrado">
          <h3>Minhas doações</h3>
          <h1>{doacoes.length}</h1>
          <p>Doações publicadas</p>
        </div>

        <div className="quadrado">
          <h3>Minhas reservas</h3>
          <h1>
            {(frutas === "pendente" ? 1 : 0) +
              (paes === "pendente" ? 1 : 0)}
          </h1>
          <p>Solicitações realizadas</p>
        </div>
      </div>

      <div className="botoes">
        <button
          className={aba === "doacoes" ? "ativo" : ""}
          onClick={() => setAba("doacoes")}
        >
          Minhas doações
        </button>

        <button
          className={aba === "reservas" ? "ativo" : ""}
          onClick={() => setAba("reservas")}
        >
          Minhas reservas
        </button>
      </div>

      {aba === "doacoes" ? (
        <div className="lista-atividades">

          {doacoes.length === 0 ? (
            <div className="item">
              <p>Você ainda não publicou nenhuma doação.</p>
            </div>
          ) : null}

          {doacoes.map((item) => (
            <div className="item" key={item.id}>
              <h3>{item.nome}</h3>
              <p>Categoria: {item.categoria}</p>
              <p>Quantidade: {item.quantidade}</p>
              <p>Validade: {item.validade}</p>
              <p>Retirada: {item.retirada}</p>
              <p>Status: Disponível</p>

              <button onClick={() => abrirEdicao(item)}>
                Editar
              </button>

              <button
                onClick={() => excluirDoacao(item.id)}
              >
                Excluir
              </button>
            </div>
          ))}

        </div>
      ) : (
        <div className="lista-atividades">

          {frutas === "pendente" ? (
            <div className="item">
              <h3>Cesta de frutas e verduras</h3>
              <p>Doador: Mercado Boa Compra</p>
              <p>Quantidade: 3 cestas</p>
              <p>Status: Pendente</p>
            </div>
          ) : null}

          {paes === "pendente" ? (
            <div className="item">
              <h3>Pães do dia</h3>
              <p>Doador: Padaria Pão Quentinho</p>
              <p>Quantidade: 8 sacos</p>
              <p>Status: Pendente</p>
            </div>
          ) : null}

          {frutas !== "pendente" && paes !== "pendente" ? (
            <div className="item">
              <p>Você ainda não solicitou nenhuma doação.</p>
            </div>
          ) : null}

        </div>
      )}

      {janela}
    </div>
  );
}
