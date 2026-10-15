
import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Cadastro() {



  const [tipo, setTipo] = useState("pessoa");






  return (
    <div className="cadastro">
      <div className="cadastro-esquerda">
        <div className="logo">
          <img src="/assets/images/logo.png" alt="Sobraê" />
          <h2>Sobraê</h2>
        </div>

        <h1>Compartilhar faz a diferença.</h1>
        <p>
          Faça parte dessa rede e ajude a reduzir
          o desperdício de alimentos.
        </p>
      </div>

      <div className="cadastro-direita">
        <div className="formulario">
  <h1>Criar conta</h1>
          <p>Escolha como deseja se cadastrar.</p>
    <div className="tipos"><button type="button"className={tipo === "pessoa" ? "selecionado" : ""} onClick={() => setTipo("pessoa")}>

              Pessoa física

            </button>
            <button type="button" className={tipo === "empresa" ? "selecionado" : ""} onClick={() => setTipo("empresa")}
            >
              Empresa
            </button>
          </div>

       <form>  {tipo === "pessoa" 
                 ? (<> <label>Nome completo</label>
               <input type="text" placeholder="Seu nome" required /></> ) 


                 : (<>  <label>Nome da empresa</label>
              <input type="text" placeholder="Nome da empresa" required />
                 <label>CNPJ</label>
            <input type="text" placeholder="00.000.000/0000-00" required /></> )

            }
            <label>E-mail</label>
          <input type="email" placeholder="Seu e-mail" required />

     <label>Senha</label>
            <input type="password" placeholder="Crie uma senha" required />  
               <button type="button" className="criar">
      Criar conta
            </button>
  </form>

      <p className="voltar">
       Já tem uma conta? <Link to="/login">Entrar</Link>
          </p>
 </div>
  </div>
 </div>
  );
}


