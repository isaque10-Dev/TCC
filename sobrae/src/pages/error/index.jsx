
import { Link } from "react-router-dom";
import "./index.css";

function NotFound() {
  return (
    <div className="naoencontrado">
      <div className="erro">
        <img src="/assets/images/logo.png" alt="Sobraê" />

        <h1>404</h1>
        <h2>Página não encontrada</h2>

        <p>
          Parece que essa página se perdeu pelo caminho.
          Mas não se preocupe, ainda temos muito para compartilhar!
        </p>

        <Link to="/" className="voltar">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
