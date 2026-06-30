import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navegarPara = useNavigate();

    async function handleLoginSubmit(evento) {
        evento.preventDefault();

        try {
            const resposta = await api.post("/login", {
                email,
                password: senha,
            });

            localStorage.setItem("token", resposta.data.token);

            navegarPara("/recados");

        } catch (erro) {
            console.log(erro);
            alert("Erro ao fazer login");
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLoginSubmit}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <br /><br />

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;