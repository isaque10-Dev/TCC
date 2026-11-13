
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api, { mensagemDaApi } from "../services/api";
import "./Login.css";











export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [enviando, setEnviando] = useState(false);
    const location = useLocation();

    const navigate = useNavigate();

    async function entrar(e) {
        e.preventDefault();

        setErro("");
        if (enviando) return;
        setEnviando(true);

        const dados = {
            email: email,
            senha: senha
        };

        try {
            const resposta = await api.post("/auth/login", dados);
            const resultado = resposta.data;

            localStorage.setItem("sobraeToken", resultado.token);
            localStorage.setItem("sobraeUsuario", JSON.stringify(resultado.usuario));

            const destino = location.state?.destino;
            navigate(destino?.startsWith("/") && !destino.startsWith("//") ? destino : "/app", { replace: true });

        } catch (error) {
            setErro(mensagemDaApi(error, "Não foi possível conectar com a API."));
            console.log(error);
        } finally {
            setEnviando(false);
        }
    }

    let mensagemErro = null;

    if (erro !== "") {
        mensagemErro = <p style={{ color: "red" }}>{erro}</p>;
    }

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

                    <form onSubmit={entrar}>

                        <label htmlFor="login-email">E-mail</label>

                        <input
                            type="email"
                            id="login-email"
                            autoComplete="username"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="login-senha">Senha</label>

                        <input
                            type="password"
                            id="login-senha"
                            autoComplete="current-password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />

                        <a href="#recuperar">Esqueceu sua senha?</a>

                        {mensagemErro}

                        <button type="submit" disabled={enviando}>{enviando ? "Entrando..." : "Entrar"}</button>

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
