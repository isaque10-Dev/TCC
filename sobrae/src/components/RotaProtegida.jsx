import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";
import api from "../pages/services/api";

export default function RotaProtegida() {
  const { pathname, search } = useLocation();
  const [sessao, setSessao] = useState(null);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);
  const token = localStorage.getItem("sobraeToken");

  useEffect(() => {
    if (!token) return;
    let ativo = true;
    setErro("");
    // O servidor valida a sessão; dados do localStorage não dão permissão.
    api.get("/auth/me").then(({ data }) => {
      if (!ativo) return;
      localStorage.setItem("sobraeUsuario", JSON.stringify(data));
      setSessao({ usuario: data, pagina: pathname });
    }).catch((error) => {
      if (ativo) setErro(error.response?.status === 401 ? "Entre novamente." : "Não foi possível verificar sua conta. Confira se a API está ligada.");
    });
    return () => { ativo = false; };
  }, [pathname, token, tentativa]);

  if (!token) return <Navigate to="/login" replace state={{ destino: pathname + search }} />;
  if (erro) return <main className="acesso-aviso"><p role="alert">{erro}</p><button onClick={() => setTentativa(tentativa + 1)}>Tentar novamente</button><Link to="/login">Voltar ao login</Link></main>;
  if (!sessao || sessao.pagina !== pathname) return <main className="acesso-aviso" role="status">Verificando sua conta...</main>;
  return <Outlet context={sessao.usuario} />;
}

export function RotaAdmin() {
  const usuario = useOutletContext();
  return usuario?.administrador ? <Outlet context={usuario} /> : <Navigate to="/app" replace />;
}
