
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";






//teste2@example.com
//Teste12345





export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    async function entrar(e) {
        e.preventDefault();

        setErro("");

        const dados = {
            email: email,
            senha: senha
        };

        try {
            const resposta = await fetch("http://127.0.0.1:50100/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            if (resposta.ok === false) {
                setErro(resultado.erro);
                return;
            }

            localStorage.setItem("sobraeToken", resultado.token);
            localStorage.setItem("sobraeUsuario", JSON.stringify(resultado.usuario));

            navigate("/app");

        } catch (error) {
            setErro("Não foi possível conectar com a API.");
            console.log(error);
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

                        <label>E-mail</label>

                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>Senha</label>

                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />

                        <a href="#recuperar">Esqueceu sua senha?</a>

                        {mensagemErro}

                        <button type="submit">Entrar</button>

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
