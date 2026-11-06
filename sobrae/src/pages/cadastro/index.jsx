
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

export default function Cadastro() {

    const [tipo, setTipo] = useState("pessoa");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    async function cadastrar(e) {
        e.preventDefault();

        setErro("");

        const formulario = new FormData(e.currentTarget);

        const dados = {
            tipo: tipo,
            email: formulario.get("email"),
            senha: formulario.get("senha")
        };

        if (tipo === "pessoa") {
            dados.nome = formulario.get("nome");
        } else {
            dados.nome_empresa = formulario.get("nome_empresa");
            dados.cnpj_empresa = formulario.get("cnpj");
        }

        try {
            const resposta = await fetch("http://127.0.0.1:50100/auth/cadastro", {
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

            navigate("/");

        } catch (error) {
            setErro("Não foi possível conectar com a API.");
            console.log(error);
        }
    }

    let campos = null;

    if (tipo === "pessoa") {
        campos = (
            <>
                <label>Nome completo</label>
                <input
                    type="text"
                    name="nome"
                    placeholder="Seu nome"
                    required
                />
            </>
        );
    } else {
        campos = (
            <>
                <label>Nome da empresa</label>
                <input
                    type="text"
                    name="nome_empresa"
                    placeholder="Nome da empresa"
                    required
                />

                <label>CNPJ</label>
                <input
                    type="text"
                    name="cnpj"
                    placeholder="00.000.000/0000-00"
                    required
                />
            </>
        );
    }

    let mensagem = null;

    if (erro !== "") {
        mensagem = <p style={{ color: "red" }}>{erro}</p>;
    }

    let classePessoa = "";
    let classeEmpresa = "";

    if (tipo === "pessoa") {
        classePessoa = "selecionado";
    } else {
        classeEmpresa = "selecionado";
    }

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

                    <div className="tipos">

                        <button
                            type="button"
                            className={classePessoa}
                            onClick={() => setTipo("pessoa")}
                        >
                            Pessoa física
                        </button>

                        <button
                            type="button"
                            className={classeEmpresa}
                            onClick={() => setTipo("empresa")}
                        >
                            Empresa
                        </button>

                    </div>

                    <form onSubmit={cadastrar}>

                        {campos}

                        <label>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Seu e-mail"
                            required
                        />

                        <label>Senha</label>
                        <input
                            type="password"
                            name="senha"
                            placeholder="Crie uma senha"
                            minLength="8"
                            required
                        />

                        {mensagem}

                        <button type="submit" className="criar">
                            Criar conta
                        </button>

                    </form>

                    <p className="voltar">
                        Já tem uma conta?{" "}
                        <Link to="/login">Entrar</Link>
                    </p>

                </div>
            </div>
        </div>
    );
}
