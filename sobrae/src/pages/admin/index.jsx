import { useEffect, useState } from "react";
import api, { mensagemDaApi } from "../services/api";
import "./index.css";

export default function Admin() {
  const [contas, setContas] = useState([]);
  const [doacoes, setDoacoes] = useState([]);
  const [erro, setErro] = useState("");
  const [resumo, setResumo] = useState({
    situacoes: [],
    solicitacoes_pendentes: 0,
  });
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [status, setStatus] = useState("todos");
  const [pagina, setPagina] = useState(1);
  const [detalhes, setDetalhes] = useState(null);

  async function carregar() {
    setCarregando(true);
    try {
      const respostas = await Promise.all([
        api.get("/admin/contas"),
        api.get("/admin/doacoes"),
        api.get("/admin/resumo"),
      ]);
      setContas(respostas[0].data);
      setDoacoes(respostas[1].data);
      setResumo(respostas[2].data);
      setErro("");
    } catch (error) {
      setErro(
        mensagemDaApi(error, "Não foi possível abrir o painel administrativo."),
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function alterarConta(conta) {
    if (salvando || conta.administrador) return;
    if (
      !window.confirm(
        (conta.ativo ? "Desativar" : "Ativar") +
          " a conta de " +
          conta.nome +
          "?",
      )
    )
      return;
    setSalvando(true);
    try {
      await api.patch(
        "/admin/contas/" + conta.tipo + "/" + conta.id + "/status",
        { ativo: !conta.ativo },
      );
      await carregar();
    } catch (error) {
      setErro(mensagemDaApi(error, "Não foi possível atualizar a conta."));
    } finally {
      setSalvando(false);
    }
  }

  const nomesStatus = {
    disponivel: "Disponíveis",
    reservado: "Reservadas",
    concluido: "Concluídas",
    cancelado: "Canceladas",
    expirado: "Vencidas",
  };
  const totalDoacoes = resumo.situacoes.reduce(
    (total, item) => total + Number(item.total),
    0,
  );
  const ativas = contas.filter((conta) => conta.ativo).length;
  const filtradas = contas.filter((conta) => {
    const texto = [conta.nome, conta.email, conta.documento, conta.num_telefone]
      .join(" ")
      .toLowerCase();
    return (
      texto.includes(busca.toLowerCase().trim()) &&
      (tipo === "todos" || conta.tipo === tipo) &&
      (status === "todos" || (status === "ativas" ? conta.ativo : !conta.ativo))
    );
  });
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / 8));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const contasVisiveis = filtradas.slice(
    (paginaAtual - 1) * 8,
    paginaAtual * 8,
  );

  function dataFormatada(valor) {
    if (!valor) return "Não informada";
    return String(valor).slice(0, 10).split("-").reverse().join("/");
  }

  return (
    <div className="admin">
      <div className="admin-topo">
        <div>
          <p className="admin-etiqueta">GESTÃO DO SOBRAÊ</p>
          <h1>Painel administrativo</h1>
          <p>Acompanhe as contas e a distribuição de alimentos.</p>
        </div>
        <button
          className="admin-secundario"
          onClick={carregar}
          disabled={carregando || salvando}
        >
          Atualizar dados
        </button>
      </div>
      {erro && (
        <p className="admin-erro" role="alert">
          {erro}
        </p>
      )}
      {carregando && <p role="status">Carregando informações...</p>}

      <div className="admin-resumo">
        <article>
          <p>Contas cadastradas</p>
          <strong>{carregando ? "—" : contas.length}</strong>
          <small>
            {ativas} ativas · {contas.length - ativas} desativadas
          </small>
        </article>
        <article>
          <p>Empresas parceiras</p>
          <strong>
            {carregando
              ? "—"
              : contas.filter((conta) => conta.tipo === "empresa").length}
          </strong>
          <small>Cadastros empresariais</small>
        </article>
        <article>
          <p>Doações publicadas</p>
          <strong>{carregando ? "—" : totalDoacoes}</strong>
          <small>Todo o histórico da plataforma</small>
        </article>
        <article>
          <p>Pedidos pendentes</p>
          <strong>{carregando ? "—" : resumo.solicitacoes_pendentes}</strong>
          <small>Aguardando resposta do doador</small>
        </article>
      </div>

      <section className="admin-painel">
        <h2>Situação das doações</h2>
        <div className="admin-situacoes">
          {Object.entries(nomesStatus).map(([chave, nome]) => {
            const total = Number(
              resumo.situacoes.find((item) => item.situacao === chave)?.total ||
                0,
            );
            return (
              <div key={chave}>
                <div className="admin-legenda">
                  <span>{nome}</span>
                  <strong>{total}</strong>
                </div>
                <div className="admin-barra">
                  <div
                    style={{
                      width:
                        (totalDoacoes ? (total / totalDoacoes) * 100 : 0) + "%",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="admin-painel">
        <h2>Contas</h2>
        <p>Consulte os cadastros e controle o acesso à plataforma.</p>
        <div className="admin-filtros">
          <label>
            Pesquisar
            <input
              type="search"
              placeholder="Nome, e-mail, documento ou telefone"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
            />
          </label>
          <label>
            Tipo
            <select
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
                setPagina(1);
              }}
            >
              <option value="todos">Todos</option>
              <option value="pessoa">Pessoa física</option>
              <option value="empresa">Empresa</option>
            </select>
          </label>
          <label>
            Situação
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPagina(1);
              }}
            >
              <option value="todos">Todas</option>
              <option value="ativas">Ativas</option>
              <option value="inativas">Desativadas</option>
            </select>
          </label>
        </div>
        <div
          className="admin-tabela-rolagem"
          tabIndex="0"
          role="region"
          aria-label="Tabela de contas"
        >
          <table className="admin-tabela">
            <thead>
              <tr>
                <th scope="col">Conta</th>
                <th scope="col">Tipo</th>
                <th scope="col">Telefone</th>
                <th scope="col">Situação</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contasVisiveis.map((conta) => (
                <tr key={conta.tipo + conta.id}>
                  <td>
                    <strong>{conta.nome}</strong>
                    <small>{conta.email}</small>
                  </td>
                  <td>
                    {conta.tipo === "empresa" ? "Empresa" : "Pessoa física"}
                    {conta.administrador && <small>Administrador</small>}
                  </td>
                  <td>{conta.num_telefone || "Não informado"}</td>
                  <td>
                    <span
                      className={
                        conta.ativo
                          ? "admin-status"
                          : "admin-status admin-inativa"
                      }
                    >
                      {conta.ativo ? "Ativa" : "Desativada"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-acoes">
                      <button
                        className="admin-secundario"
                        onClick={() => setDetalhes(conta)}
                      >
                        Ver detalhes
                      </button>
                      <button
                        className="admin-alterar"
                        disabled={conta.administrador || salvando || carregando}
                        onClick={() => alterarConta(conta)}
                      >
                        {conta.ativo ? "Desativar" : "Ativar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!carregando && !contasVisiveis.length && (
          <p className="admin-vazio">
            Nenhuma conta encontrada para esses filtros.
          </p>
        )}
        <div className="admin-paginacao">
          <span>
            {filtradas.length} contas · Página {paginaAtual} de {totalPaginas}
          </span>
          <div>
            <button
              className="admin-secundario"
              disabled={paginaAtual <= 1}
              onClick={() => setPagina(paginaAtual - 1)}
            >
              Anterior
            </button>
            <button
              className="admin-secundario"
              disabled={paginaAtual >= totalPaginas}
              onClick={() => setPagina(paginaAtual + 1)}
            >
              Próxima
            </button>
          </div>
        </div>
      </section>

      <section className="admin-painel">
        <h2>Doações recentes</h2>
        <p>Até 100 publicações mais recentes.</p>
        <div
          className="admin-tabela-rolagem"
          tabIndex="0"
          role="region"
          aria-label="Tabela de doações"
        >
          <table className="admin-tabela">
            <thead>
              <tr>
                <th scope="col">Alimento</th>
                <th scope="col">Doador</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Validade</th>
                <th scope="col">Situação</th>
              </tr>
            </thead>
            <tbody>
              {doacoes.map((doacao) => (
                <tr key={doacao.id_doacao}>
                  <td>
                    <strong>{doacao.nome}</strong>
                    <small>
                      Publicado em {dataFormatada(doacao.data_doacao)}
                    </small>
                  </td>
                  <td>{doacao.doador}</td>
                  <td>
                    {doacao.quantidade} {doacao.unidade}
                  </td>
                  <td>{dataFormatada(doacao.validade)}</td>
                  <td>{nomesStatus[doacao.situacao] || doacao.situacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!carregando && !doacoes.length && (
          <p className="admin-vazio">Nenhuma doação publicada.</p>
        )}
      </section>

      {detalhes && (
        <div
          className="admin-fundo"
          onClick={() => setDetalhes(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setDetalhes(null);
          }}
        >
          <section
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-detalhes"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-topo">
              <div>
                <p className="admin-etiqueta">DADOS CADASTRADOS</p>
                <h2 id="admin-detalhes">{detalhes.nome}</h2>
              </div>
              <button
                autoFocus
                className="admin-secundario"
                onClick={() => setDetalhes(null)}
                aria-label="Fechar detalhes"
              >
                Fechar
              </button>
            </div>
            <dl className="admin-dados">
              <div>
                <dt>Tipo de conta</dt>
                <dd>
                  {detalhes.tipo === "empresa" ? "Empresa" : "Pessoa física"}
                </dd>
              </div>
              <div>
                <dt>Código</dt>
                <dd>{detalhes.id}</dd>
              </div>
              <div>
                <dt>E-mail</dt>
                <dd>{detalhes.email}</dd>
              </div>
              <div>
                <dt>Telefone</dt>
                <dd>{detalhes.num_telefone || "Não informado"}</dd>
              </div>
              <div>
                <dt>{detalhes.tipo === "empresa" ? "CNPJ" : "CPF"}</dt>
                <dd>{detalhes.documento || "Não informado"}</dd>
              </div>
              <div>
                <dt>Situação</dt>
                <dd>{detalhes.ativo ? "Ativa" : "Desativada"}</dd>
              </div>
              <div>
                <dt>Permissão</dt>
                <dd>{detalhes.administrador ? "Administrador" : "Usuário"}</dd>
              </div>
              <div>
                <dt>Preferência de localização</dt>
                <dd>{detalhes.usar_localizacao ? "Ativada" : "Desativada"}</dd>
              </div>
              <div>
                <dt>Distância preferida</dt>
                <dd>{detalhes.distancia_km} km</dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </div>
  );
}
