
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Doacoes() {

    const [categoria, setCategoria] = useState("Todos");
    const [busca, setBusca] = useState("");

    const [abrir, setAbrir] = useState(false);
    const [reserva, setReserva] = useState(null);
      
    const [abrirEvento, setAbrirEvento] = useState(false);
    const [tipoOrganizador, setTipoOrganizador] = useState("pessoa");
    const [mensagemEvento, setMensagemEvento] = useState("");

    const [doacoes, setDoacoes] = useState([]);
    const [solicitadas, setSolicitadas] = useState([]);

    const [carregando, setCarregando] = useState(true);
    const [enviando, setEnviando] = useState(false);

    const [erro, setErro] = useState("");
    const [erroModal, setErroModal] = useState("");
    const [erroReserva, setErroReserva] = useState("");

    const navigate = useNavigate();

    const api = "http://127.0.0.1:50100";


    // CARREGAR AS DOACOES DO MYSQL

    async function carregarDoacoes() {
        try {
            const resposta = await fetch(api + "/doacoes?limite=100");

            if (resposta.ok === false) {
                throw new Error("Erro ao buscar doações");
            }

            const dados = await resposta.json();

            setDoacoes(dados);
            setErro("");

        } catch (error) {
            console.log(error);
            setErro("Não foi possível carregar as doações.");

        }

        setCarregando(false);
    }



    async function carregarSolicitacoes() {

        const token = localStorage.getItem("sobraeToken");

        if (!token) {
            setSolicitadas([]);
            return;
        }

        try {
            const resposta = await fetch(api + "/solicitacoes?limite=100", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            if (resposta.ok === true) {
                const dados = await resposta.json();
                setSolicitadas(dados);
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        carregarDoacoes();
        carregarSolicitacoes();
    }, []);



    function minhaDoacao(doacao) {

        const salvo = localStorage.getItem("sobraeUsuario");

        if (!salvo) {
            return false;
        }

        const usuario = JSON.parse(salvo);

        if (usuario.tipo === "pessoa") {
            return doacao.id_pessoal === usuario.id;
        }

        if (usuario.tipo === "empresa") {
            return doacao.id_empresa === usuario.id;
        }

        return false;
    }



    function jaSolicitada(codigo) {

        for (const pedido of solicitadas) {

            if (pedido.id_doacao === codigo) {

                if (pedido.status === "pendente") {
                    return true;
                }

                if (pedido.status === "aprovada") {
                    return true;
                }
            }
        }

        return false;
    }



    async function publicarDoacao(e) {

        e.preventDefault();

        const token = localStorage.getItem("sobraeToken");

        if (!token) {
            alert("Faça login para publicar uma doação.");
            navigate("/login");
            return;
        }

        const formulario = new FormData(e.currentTarget);

        const novaDoacao = {
            nome: formulario.get("nome"),
            categoria: formulario.get("categoria"),
            quantidade: formulario.get("quantidade"),
            validade: formulario.get("validade"),
            retirada: formulario.get("retirada")
        };

        setEnviando(true);
        setErroModal("");

        try {

            const resposta = await fetch(api + "/doacoes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify(novaDoacao)
            });

            const resultado = await resposta.json();

            if (resposta.ok === false) {
                setErroModal(resultado.erro);
                setEnviando(false);
                return;
            }

            setAbrir(false);

            await carregarDoacoes();

            alert("Doação publicada com sucesso!");

        } catch (error) {
            console.log(error);
            setErroModal("Não foi possível conectar com a API.");
        }

        setEnviando(false);
    }



    function abrirReserva(doacao) {

        const token = localStorage.getItem("sobraeToken");

        if (!token) {
            alert("Faça login para solicitar uma doação.");
            navigate("/login");
            return;
        }

        setErroReserva("");
        setReserva(doacao);
    }



    async function confirmarReserva() {

        const token = localStorage.getItem("sobraeToken");

        if (!token) {
            navigate("/login");
            return;
        }

        setEnviando(true);
        setErroReserva("");

        try {

            const resposta = await fetch(
                api + "/doacoes/" + reserva.id_doacao + "/solicitacoes",
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            const resultado = await resposta.json();

            if (resposta.ok === false) {
                setErroReserva(resultado.erro);
                setEnviando(false);
                return;
            }

            await carregarSolicitacoes();
            await carregarDoacoes();

            setReserva(null);

            alert("Solicitação enviada! Aguarde a aprovação do doador.");

        } catch (error) {
            console.log(error);
            setErroReserva("Não foi possível enviar a solicitação.");
        }

        setEnviando(false);
    }



    function imagemDoacao(tipo) {

        if (tipo === "Frutas e verduras") {
            return "/assets/images/frutas.png";
        }

        if (tipo === "Pães") {
            return "/assets/images/paes.png";
        }

        if (tipo === "Refeições") {
            return "/assets/images/refeicoes.png";
        }

        return "/assets/images/alimentos.png";
    }



    function formatarData(data) {

        if (!data) {
            return "";
        }

        const partes = data.split("-");

        if (partes.length === 3) {
            return partes[2] + "/" + partes[1] + "/" + partes[0];
        }

        return data;
    }



    function classeCategoria(nome) {

        if (categoria === nome) {
            return "butao ativo";
        }

        return "butao";
    }



    const doacoesFiltradas = doacoes.filter((doacao) => {

        if (categoria !== "Todos") {
            if (doacao.categoria !== categoria) {
                return false;
            }
        }

        if (busca.trim() !== "") {

            const pesquisa = busca.toLowerCase().trim();
            const alimento = doacao.nome.toLowerCase();
            const doador = String(doacao.doador).toLowerCase();

            if (!alimento.includes(pesquisa)) {
                if (!doador.includes(pesquisa)) {
                    return false;
                }
            }
        }

        return true;
    });



      // ENVIO DE SOLICITAÇÃO DE EVENTO SOLIDÁRIO
  function solicitarEvento(e) {
    e.preventDefault();

    const formulario = new FormData(e.currentTarget);

    const novaSolicitacao = {
      id: Date.now(),
      tipoOrganizador,
      nomeResponsavel: String(formulario.get("nomeResponsavel") || "").trim(),
      nomeOrganizacao:
        tipoOrganizador === "pessoa"
          ? ""
          : String(formulario.get("nomeOrganizacao") || "").trim(),
      email: String(formulario.get("email") || "").trim(),
      telefone: String(formulario.get("telefone") || "").trim(),
      nomeEvento: String(formulario.get("nomeEvento") || "").trim(),
      proposta: String(formulario.get("proposta") || "").trim(),
      alimentos: String(formulario.get("alimentos") || "").trim(),
      publicoEstimado: Number(formulario.get("publicoEstimado")),
      endereco: String(formulario.get("endereco") || "").trim(),
      cidade: String(formulario.get("cidade") || "").trim(),
      estado: String(formulario.get("estado") || "").trim(),
      data: String(formulario.get("data") || ""),
      horario: String(formulario.get("horario") || ""),
      status: "Pendente de análise",
      criadoEm: new Date().toISOString()
    };

    const solicitacoes = JSON.parse(
      localStorage.getItem("solicitacoesEventosSobrae") || "[]"
    );

    solicitacoes.unshift(novaSolicitacao);

    localStorage.setItem(
      "solicitacoesEventosSobrae",
      JSON.stringify(solicitacoes)
    );

    const avisos = JSON.parse(
      localStorage.getItem("avisosSobrae") || "[]"
    );

    avisos.unshift(
      "Sua proposta de evento '" +
        novaSolicitacao.nomeEvento +
        "' foi registrada e está pendente de análise."
    );

    localStorage.setItem("avisosSobrae", JSON.stringify(avisos));

    setAbrirEvento(false);
    setTipoOrganizador("pessoa");
    setMensagemEvento(
      "Sua proposta foi registrada com sucesso! Ela está pendente de análise."
    );
  }


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

                        <label>Imagem do alimento</label>

<input
    type="file"
    name="imagem"
    accept="image/png,image/jpeg,image/webp"
/>

                        <p style={{ color: "red" }}>{erroModal}</p>

                        <div className="acoes">

                            <button
                                type="button"
                                className="cancelar"
                                onClick={() => setAbrir(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="salvar"
                                disabled={enviando}
                            >
                                Publicar
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        );
    }



    let janelaReserva = null;

    if (reserva !== null) {

        janelaReserva = (
            <div
                className="fundo-reserva"
                onClick={() => setReserva(null)}
            >

                <div
                    className="modal-reserva"
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className="reserva-topo">
                        <h2>Confirmar reserva</h2>

                        <button
                            type="button"
                            onClick={() => setReserva(null)}
                        >
                            X
                        </button>
                    </div>

                    <h3>{reserva.nome}</h3>

                    <p>{reserva.doador}</p>

                    <p>
                        Quantidade: {reserva.quantidade} {reserva.unidade}
                    </p>

                    <p>
                        Local: {reserva.local_retirada}
                    </p>

                    <p>
                        Deseja solicitar esta doação?
                        Após confirmar, sua solicitação ficará
                        pendente de aprovação pelo doador.
                    </p>

                    <p style={{ color: "red" }}>{erroReserva}</p>

                    <div className="reserva-botoes">

                        <button
                            type="button"
                            className="cancelar-reserva"
                            onClick={() => setReserva(null)}
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            className="confirmar-reserva"
                            onClick={confirmarReserva}
                            disabled={enviando}
                        >
                            Confirmar
                        </button>

                    </div>

                </div>
            </div>
        );
    }



    let mensagemLista = null;

    if (carregando === true) {
        mensagemLista = <p>Carregando doações...</p>;

    } else if (erro !== "") {
        mensagemLista = <p>{erro}</p>;

    } else if (doacoesFiltradas.length === 0) {
        mensagemLista = <p>Nenhuma doação encontrada.</p>;
    }

    
  // MODAL DE SOLICITAÇÃO DE EVENTO SOLIDÁRIO
  let janelaEvento = null;

  if (abrirEvento) {
    janelaEvento = (
      <div
        className="evento-fundo-modal"
        onClick={() => setAbrirEvento(false)}
      >
        <div
          className="evento-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="evento-titulo-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="evento-modal-topo">
            <div>
              <h2 id="evento-titulo-modal">
                Propor evento solidário
              </h2>
              <p>
                Conte sua ideia para a equipe do Sobraê.
              </p>
            </div>

            <button
              type="button"
              className="evento-fechar"
              aria-label="Fechar formulário"
              onClick={() => setAbrirEvento(false)}
            >
              ×
            </button>
          </div>

          <div className="evento-aviso">
            Sua proposta será analisada pela equipe do
            Sobraê. O envio não significa que o evento
            foi aprovado.
          </div>

          <form onSubmit={solicitarEvento}>
            <h3>1. Dados do organizador</h3>

            <label htmlFor="evento-tipo">
              Quem está propondo o evento?
            </label>
            <select
              id="evento-tipo"
              value={tipoOrganizador}
              onChange={(e) =>
                setTipoOrganizador(e.target.value)
              }
              required
            >
              <option value="pessoa">Pessoa física</option>
              <option value="empresa">Empresa</option>
              <option value="instituicao">
                Instituição ou ONG
              </option>
            </select>

            {tipoOrganizador !== "pessoa" && (
              <>
                <label htmlFor="evento-organizacao">
                  {tipoOrganizador === "empresa"
                    ? "Nome da empresa"
                    : "Nome da instituição"}
                </label>
                <input
                  id="evento-organizacao"
                  name="nomeOrganizacao"
                  type="text"
                  placeholder="Nome da organização"
                  required
                />
              </>
            )}

            <label htmlFor="evento-responsavel">
              Nome do responsável
            </label>
            <input
              id="evento-responsavel"
              name="nomeResponsavel"
              type="text"
              placeholder="Nome completo"
              required
            />

            <div className="evento-duas-colunas">
              <div>
                <label htmlFor="evento-email">E-mail</label>
                <input
                  id="evento-email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="evento-telefone">
                  Telefone / WhatsApp
                </label>
                <input
                  id="evento-telefone"
                  name="telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
            </div>

            <h3>2. Sobre o evento</h3>

            <label htmlFor="evento-nome">
              Nome do evento
            </label>
            <input
              id="evento-nome"
              name="nomeEvento"
              type="text"
              placeholder="Ex: Alimentando nossa comunidade"
              required
            />

            <label htmlFor="evento-proposta">
              Qual é a sua proposta?
            </label>
            <textarea
              id="evento-proposta"
              name="proposta"
              rows="4"
              placeholder="Explique como será a distribuição, quem será beneficiado, como pretende organizar e que apoio espera do Sobraê."
              required
            />

            <label htmlFor="evento-alimentos">
              Quais alimentos pretende distribuir?
            </label>
            <textarea
              id="evento-alimentos"
              name="alimentos"
              rows="3"
              placeholder="Ex: 100 marmitas, 50 cestas básicas, frutas e pães. Informe também se já possui os alimentos ou precisa de parceiros."
              required
            />

            <label htmlFor="evento-publico">
              Quantas pessoas pretende atender?
            </label>
            <input
              id="evento-publico"
              name="publicoEstimado"
              type="number"
              min="1"
              placeholder="Ex: 150"
              required
            />

            <h3>3. Local e data</h3>

            <label htmlFor="evento-endereco">
              Local previsto para a distribuição
            </label>
            <input
              id="evento-endereco"
              name="endereco"
              type="text"
              placeholder="Rua, número, bairro ou ponto de referência"
              required
            />

            <div className="evento-duas-colunas">
              <div>
                <label htmlFor="evento-cidade">Cidade</label>
                <input
                  id="evento-cidade"
                  name="cidade"
                  type="text"
                  placeholder="Ex: São Paulo"
                  required
                />
              </div>
              <div>
                <label htmlFor="evento-estado">Estado</label>
                <select
                  id="evento-estado"
                  name="estado"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Selecione</option>
                  {[
                    "AC", "AL", "AP", "AM", "BA", "CE",
                    "DF", "ES", "GO", "MA", "MT", "MS",
                    "MG", "PA", "PB", "PR", "PE", "PI",
                    "RJ", "RN", "RS", "RO", "RR", "SC",
                    "SP", "SE", "TO"
                  ].map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="evento-duas-colunas">
              <div>
                <label htmlFor="evento-data">
                  Data prevista
                </label>
                <input
                  id="evento-data"
                  name="data"
                  type="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  required
                />
              </div>
              <div>
                <label htmlFor="evento-horario">
                  Horário previsto
                </label>
                <input
                  id="evento-horario"
                  name="horario"
                  type="time"
                  required
                />
              </div>
            </div>

            <div className="evento-termos">
              <label>
                <input type="checkbox" required />
                <span>
                  Entendo que esta é apenas uma solicitação.
                  A realização do evento depende de análise
                  e aprovação da equipe do Sobraê.
                </span>
              </label>
            </div>

            <div className="evento-acoes">
              <button
                type="button"
                className="evento-cancelar"
                onClick={() => setAbrirEvento(false)}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="evento-enviar"
              >
                Enviar proposta
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }


    return (
        <div className="doe">

            <div className="doe-topo">

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
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />

                        <div className="botao">

                            <button
                                className={classeCategoria("Todos")}
                                onClick={() => setCategoria("Todos")}
                            >
                                Todos
                            </button>

                            <button
                                className={classeCategoria("Frutas e verduras")}
                                onClick={() => setCategoria("Frutas e verduras")}
                            >
                                Frutas e verduras
                            </button>

                            <button
                                className={classeCategoria("Pães")}
                                onClick={() => setCategoria("Pães")}
                            >
                                Pães
                            </button>

                            <button
                                className={classeCategoria("Refeições")}
                                onClick={() => setCategoria("Refeições")}
                            >
                                Refeições
                            </button>

                            <button
                                className={classeCategoria("Outro")}
                                onClick={() => setCategoria("Outro")}
                            >
                                Outro
                            </button>

                        </div>

                    </div>
                </div>


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
                        onClick={() => {
                            setErroModal("");
                            setAbrir(true);
                        }}
                    >
                        + Adicionar doação
                    </button>

                </div>

            </div>

                 
      {/* SEÇÃO DE EVENTOS SOLIDÁRIOS */}
      <section className="evento-secao">
        <div className="evento-conteudo">
          <span className="evento-etiqueta">
            Solidariedade além da internet
          </span>

          <h2>Organize um evento solidário</h2>

          <p>
            Nem todas as pessoas têm acesso à internet.
            Ajude o Sobraê a levar alimentos diretamente
            às comunidades que mais precisam.
          </p>

          <p>
            Você, sua empresa ou instituição pode propor
            um evento presencial de distribuição gratuita
            de alimentos.
          </p>

          <div className="evento-destaque">
            Sua ideia, nosso propósito: fazer o alimento
            chegar a quem precisa.
          </div>

          <button
            type="button"
            className="evento-botao"
            onClick={() => setAbrirEvento(true)}
          >
            + Propor evento solidário
          </button>

          <small>
            Todas as propostas passam por análise
            da equipe do Sobraê.
          </small>

          {mensagemEvento && (
            <p className="evento-sucesso" role="status">
              {mensagemEvento}
            </p>
          )}
        </div>
      </section>
           

            <div className="disponiveis">

                <h2>Doações disponíveis</h2>

                <div className="cards">

                    {doacoesFiltradas.map((doacao) => {

                        let bloqueado = false;
                        let textoBotao = "Reservar doação";

                        if (minhaDoacao(doacao)) {
                            bloqueado = true;
                            textoBotao = "Sua doação";
                        }

                        if (jaSolicitada(doacao.id_doacao)) {
                            bloqueado = true;
                            textoBotao = "Solicitado";
                        }

                        return (
                            <div
                                className="card"
                                key={doacao.id_doacao}
                            >

                                <img
                                    src={imagemDoacao(doacao.categoria)}
                                    alt={doacao.nome}
                                />

                                <div className="dados">

                                    <h3>{doacao.nome}</h3>

                                    <p>{doacao.doador}</p>

                                    <p>
                                        Quantidade: {doacao.quantidade} {doacao.unidade}
                                    </p>

                                    <p>
                                        Validade: {formatarData(doacao.validade)}
                                    </p>

                                    <span className="status">
                                        Disponível
                                    </span>

                                    <div className="acoes-card">

                                        <button
                                            className="reservar"
                                            disabled={bloqueado}
                                            onClick={() => abrirReserva(doacao)}
                                        >
                                            {textoBotao}
                                        </button>

                                    </div>

                                </div>
                            </div>
                        );
                    })}

                </div>

                {mensagemLista}

            </div>

            {janela}
            {janelaReserva}
            {janelaEvento}

        </div>
    );
};
 