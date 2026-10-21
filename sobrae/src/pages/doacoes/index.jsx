
import React, { useState } from "react";
import "./index.css";

export default function Doacoes() {
  const [categoria, setCategoria] = useState("Todos");
  const [abrir, setAbrir] = useState(false);



  let janela = null;

  if (abrir === true) {
    janela = (
      <div className="fundo-modal" onClick={() => setAbrir(false)} >
        <div className="modal"onClick={(e) => e.stopPropagation()}>
          <div className="modal-topo">
            <h2>Nova doação</h2>

            <button type="button"className="fechar"onClick={() => setAbrir(false)}>  X  </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <label>Nome do alimento</label>
            <input type="text" placeholder="Ex: Arroz" required
            />

            <label>Categoria</label>
            <select required defaultValue="">
              <option value="" disabled>
                Selecione uma categoria
              </option>
              <option>Frutas e verduras</option>
              <option>Pães</option>
              <option>Refeições</option>
              <option>Outro</option>
            </select>

            <label>Quantidade</label>
            <input   type="text"  placeholder="Ex: 5 kg" required />

            <label>Data de validade</label>
            <input type="date" required />

            <label>Local para retirada</label>
            <input
              type="text"
              placeholder="Onde retirar?"
              required
            />

            <div className="acoes">
              <button  type="button" className="cancelar" onClick={() => setAbrir(false)} >  Cancelar  </button>

      <button type="submit" className="salvar">      Publica        </button>
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
         <img className="baner" src="/assets/images/baner.png" alt="Banner"/>

          <img className="comida" src="/assets/images/alimentos.png" alt="Cesta de alimentos" />

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
              <button className={`butao ${categoria === "Todos" ? "ativo" : ""}`}  onClick={() => setCategoria("Todos")}>Todos </button>
              <button className={`butao ${categoria === "Frutas e verduras" ? "ativo" : ""}`} onClick={() => setCategoria("Frutas e verduras")} >  Frutas e verduras </button>

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

  
      <div className="disponiveis">
        <h2>Doações disponíveis</h2>

        <div className="cards">
   

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
                  <button className="reservar">
                    Reservar doação
           </button>          </div>
         </div>
</div>
          ) : null}



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

                  <button className="reservar">
                  Reservar doação
                  </button>
              </div>
              </div>
            </div>
) : null}



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

  

      {janela}

    </div>
  );
}
