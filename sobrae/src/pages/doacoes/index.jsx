
import React, { useState } from "react";
import "./index.css";

export default function Doacoes() {
  const [categoria, setCategoria] = useState("Todos");
  const [abrir, setAbrir] = useState(false);
  const [reserva, setReserva] = useState("");

  const [frutasSolicitada, setFrutasSolicitada] = useState(
    localStorage.getItem("reservaFrutas") === "pendente"
  );

  const [paesSolicitado, setPaesSolicitado] = useState(
    localStorage.getItem("reservaPaes") === "pendente"
  );


  // CONFIRMAR RESERVA

  function confirmarReserva() {
    let mensagem = "";

    if (reserva === "frutas") {
      setFrutasSolicitada(true);
      localStorage.setItem("reservaFrutas", "pendente");

      mensagem = "Você solicitou uma cesta de frutas e verduras.";
    }

    if (reserva === "paes") {
      setPaesSolicitado(true);
      localStorage.setItem("reservaPaes", "pendente");

      mensagem = "Você solicitou uma doação de pães.";
    }

    if (mensagem !== "") {
      const avisos = JSON.parse(
        localStorage.getItem("avisosSobrae") || "[]"
      );

      avisos.unshift(mensagem);

      localStorage.setItem(
        "avisosSobrae",
        JSON.stringify(avisos)
      );
    }

    setReserva("");
    alert("Solicitação enviada com sucesso!");
  }


  // PUBLICAR DOACAO

  function publicarDoacao(e) {
    e.preventDefault();

    const formulario = new FormData(e.currentTarget);

    const novaDoacao = {
      id: Date.now(),
      nome: formulario.get("nome"),
      categoria: formulario.get("categoria"),
      quantidade: formulario.get("quantidade"),
      validade: formulario.get("validade"),
      retirada: formulario.get("retirada")
    };

    const salvas = JSON.parse(
      localStorage.getItem("minhasDoacoes") || "[]"
    );

    const todas = [...salvas, novaDoacao];

    localStorage.setItem(
      "minhasDoacoes",
      JSON.stringify(todas)
    );

    const avisos = JSON.parse(
      localStorage.getItem("avisosSobrae") || "[]"
    );

    avisos.unshift("Você publicou: " + novaDoacao.nome);

    localStorage.setItem(
      "avisosSobrae",
      JSON.stringify(avisos)
    );

    setAbrir(false);
    alert("Doação publicada com sucesso!");
  }


  // MODAL DE NOVA DOACAO

  let janela = null;

  if (abrir === true) {
    janela = (
      <div
        className="fundo-modal"
        onClick={() => setAbrir(false)}
      >
        <div
          className="modal-doacao"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-doacao-topo">
            <h2>Nova doação</h2>

            <button
              type="button"
              className="fechar"
              onClick={() => setAbrir(false)}
            >
              X
            </button>
          </div>

          <form onSubmit={publicarDoacao}>
            <label>Nome do alimento</label>
            <input
              type="text"
              name="nome"
              placeholder="Ex: Arroz"
              required
            />

            <label>Categoria</label>
            <select name="categoria" required defaultValue="">
              <option value="" disabled>
                Selecione uma categoria
              </option>
              <option>Frutas e verduras</option>
              <option>Pães</option>
              <option>Refeições</option>
              <option>Outro</option>
            </select>

            <label>Quantidade</label>
            <input
              type="text"
              name="quantidade"
              placeholder="Ex: 5 kg"
              required
            />

            <label>Data de validade</label>
            <input
              type="date"
              name="validade"
              required
            />

            <label>Local para retirada</label>
            <input
              type="text"
              name="retirada"
              placeholder="Onde retirar?"
              required
            />

            <div className="acoes">
              <button
                type="button"
                className="cancelar"
                onClick={() => setAbrir(false)}
              >
                Cancelar
              </button>

              <button type="submit" className="salvar">
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }


  // MODAL DE RESERVA

  let janelaReserva = null;

  if (reserva !== "") {
    janelaReserva = (
      <div
        className="fundo-reserva"
        onClick={() => setReserva("")}
      >
        <div
          className="modal-reserva"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="reserva-topo">
            <h2>Confirmar reserva</h2>

            <button onClick={() => setReserva("")}>
              X
            </button>
          </div>

          <h3>
            {reserva === "frutas"
              ? "Cesta de frutas e verduras"
              : "Pães do dia"}
          </h3>

          <p>
            {reserva === "frutas"
              ? "Mercado Boa Compra"
              : "Padaria Pão Quentinho"}
          </p>

          <p>
            Quantidade: {reserva === "frutas"
              ? "3 cestas"
              : "8 sacos"}
          </p>

          <p>
            Deseja solicitar esta doação?
            Após confirmar, sua solicitação ficará
            pendente de aprovação pelo doador.
          </p>

          <div className="reserva-botoes">
            <button
              className="cancelar-reserva"
              onClick={() => setReserva("")}
            >
              Cancelar
            </button>

            <button
              className="confirmar-reserva"
              onClick={confirmarReserva}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="doe">

      <div className="doe-topo">

        {/* BANNER */}

        <div className="topo-pt1">
          <img
            className="baner"
            src="/assets/images/baner.png"
            alt="Banner"
          />

          <img
            className="comida"
            src="/assets/images/alimentos.png"
            alt="Cesta de alimentos"
          />

          <div className="bannerMais">
            <h1 className="titu">DOAÇÕES</h1>

            <h2 className="agaDois">
              Conectamos o excedente de alimentos de quem pode doar
              com pessoas que precisam.
            </h2>

            <input
              className="enput"
              type="text"
              placeholder="Buscar doações..."
            />

            <div className="botao">
              <button
                className={`butao ${categoria === "Todos" ? "ativo" : ""}`}
                onClick={() => setCategoria("Todos")}
              >
                Todos
              </button>

              <button
                className={`butao ${categoria === "Frutas e verduras" ? "ativo" : ""}`}
                onClick={() => setCategoria("Frutas e verduras")}
              >
                Frutas e verduras
              </button>

              <button
                className={`butao ${categoria === "Pães" ? "ativo" : ""}`}
                onClick={() => setCategoria("Pães")}
              >
                Pães
              </button>

              <button
                className={`butao ${categoria === "Refeições" ? "ativo" : ""}`}
                onClick={() => setCategoria("Refeições")}
              >
                Refeições
              </button>

              <button
                className={`butao ${categoria === "Outro" ? "ativo" : ""}`}
                onClick={() => setCategoria("Outro")}
              >
                Outro
              </button>
            </div>
          </div>
        </div>


        {/* POSTAR DOACAO */}

        <div className="insc">
          <div>
            <h2>Postar Doação</h2>

            <p>
              Tem alimentos sobrando? Compartilhe com quem precisa!
              Cadastre sua doação e ajude a combater o desperdício.
            </p>
          </div>

          <div className="informacoes">
            <p>Ao cadastrar, você poderá informar:</p>

            <span>Nome do alimento</span>
            <span>Quantidade disponível</span>
            <span>Data de validade</span>
            <span>Local para retirada</span>
          </div>

          <button
            className="publicar"
            onClick={() => setAbrir(true)}
          >
            + Adicionar doação
          </button>
        </div>

      </div>


      {/* DOACOES DISPONIVEIS */}

      <div className="disponiveis">
        <h2>Doações disponíveis</h2>

        <div className="cards">

          {/* FRUTAS */}

          {(categoria === "Todos" || categoria === "Frutas e verduras") ? (
            <div className="card">
              <img
                src="/assets/images/frutas.png"
                alt="Frutas e verduras"
              />

              <div className="dados">
                <h3>Cesta de frutas e verduras</h3>

                <p>Mercado Boa Compra</p>
                <p>Quantidade: 3 cestas</p>
                <p>Validade: 2 dias</p>

                <span className="status">Disponível</span>

                <div className="acoes-card">
                  <button className="detalhes">
                    Ver detalhes
                  </button>

                  <button
                    className="reservar"
                    onClick={() => setReserva("frutas")}
                    disabled={frutasSolicitada}
                  >
                    {frutasSolicitada ? "Solicitado" : "Reservar doação"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}


          {/* PAES */}

          {(categoria === "Todos" || categoria === "Pães") ? (
            <div className="card">
              <img
                src="/assets/images/paes.png"
                alt="Pães"
              />

              <div className="dados">
                <h3>Pães do dia</h3>

                <p>Padaria Pão Quentinho</p>
                <p>Quantidade: 8 sacos</p>
                <p>Validade: 1 dia</p>

                <span className="status">Disponível</span>

                <div className="acoes-card">
                  <button className="detalhes">
                    Ver detalhes
                  </button>

                  <button
                    className="reservar"
                    onClick={() => setReserva("paes")}
                    disabled={paesSolicitado}
                  >
                    {paesSolicitado ? "Solicitado" : "Reservar doação"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}


          {/* REFEICOES */}

          {(categoria === "Todos" || categoria === "Refeições") ? (
            <div className="card">
              <img
                src="/assets/images/refeicoes.png"
                alt="Refeições"
              />

              <div className="dados">
                <h3>Marmitas para almoço</h3>

                <p>Restaurante Sabor & Arte</p>
                <p>Quantidade: 10 unidades</p>
                <p>Validade: Hoje</p>

                <span className="status reservado">
                  Reservado
                </span>

                <div className="acoes-card">
                  <button className="detalhes">
                    Ver detalhes
                  </button>

                  <button className="reservar" disabled>
                    Reservado
                  </button>
                </div>
              </div>
            </div>
          ) : null}

        </div>

        {categoria === "Outro" ? (
          <p>Nenhuma doação encontrada nesta categoria.</p>
        ) : null}

      </div>


      {/* MODAIS */}

      {janela}
      {janelaReserva}

    </div>
  );
}
