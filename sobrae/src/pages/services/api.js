
import axios from "axios";

// Usa o mesmo endereço do site, inclusive pelo link compartilhado do VS Code.
export const API_URL = process.env.REACT_APP_API_URL || "/api";

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("sobraeToken");

    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }

    return config;
});

export function mensagemDaApi(error, mensagemPadrao) {
    return error.response?.data?.erro || error.response?.data?.mensagem || mensagemPadrao;
}

api.interceptors.response.use((resposta) => resposta, (error) => {
    const rota = error.config?.url;
    if (error.response?.status === 401 && rota !== "/auth/login" && rota !== "/auth/cadastro") {
        localStorage.removeItem("sobraeToken");
        localStorage.removeItem("sobraeUsuario");
        if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
            window.location.replace("/login");
        }
    }
    return Promise.reject(error);
});

export default api;
