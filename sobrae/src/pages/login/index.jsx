
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="login-esquerda">
       <div className="login-logo">
  <img src="/assets/images/logo.png" alt="Sobraê" />
  <h1>Sobra<span>ê</span></h1>
</div>

        <h1>Compartilhar faz a diferença.</h1>

        <p>
          Conectando quem tem alimentos disponíveis
          com quem precisa.
        </p>
      </div>

      <div className="login-direita">
        <div className="login-caixa">
          <h1>Bem-vindo!</h1>
          <p>Entre na sua conta para continuar.</p>

          <form>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"required
            />

            <label>Senha</label>
            <input type="password"placeholder="Digite sua senha"required
            />

            <a href="#recuperar">Esqueceu sua senha?</a>

            <button type="button">Entrar</button>
          </form>

          <p>
            Não tem uma conta?{" "}
            <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


