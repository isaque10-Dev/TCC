
import React, { useState } from "react";
import "./index.css";

export default function Atividades() {
  const [aba, setAba] = useState("doacoes");

  return (
    <div className="atividades">
      <h1>Minhas Atividades</h1>
      <p>Gerencie suas doações e acompanhe suas reservas.</p>

      <div className="resumo">
        <div className="quadrado">
          <h3>Minhas doações</h3>
          <h1>2</h1>
          <p>Doações publicadas</p>
        </div>

        <div className="quadrado">
          <h3>Minhas reservas</h3>
          <h1>1</h1>
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
          <div className="item">
            <h3>Pães do dia</h3>
            <p>Quantidade: 8 sacos</p>
            <p>Status: Disponível</p>

            <button disabled>Gerenciar doação</button>
          </div>

          <div className="item">
            <h3>Cesta de verduras</h3>
            <p>Quantidade: 3 cestas</p>
            <p>Status: Reservada</p>

            <button disabled>Gerenciar doação</button>
          </div>
        </div>
      ) : (
        <div className="lista-atividades">
          <div className="item">
            <h3>Marmita para almoço</h3>
            <p>Doador: Restaurante Sabor & Arte</p>
            <p>Status: Pendente</p>
            <p>Aguardando aprovação do doador.</p>
          </div>
        </div>
      )}
    </div>
  );
}
