import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navegarPara = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Mensagem de erro vinda da API (ex: "e-mail já cadastrado")
    const [mensagemErro, setMensagemErro] = useState("");

    async function handleRegisterSubmit(evento) {
        evento.preventDefault();

        try {
            await api.post("/register", {
                name: nome,
                email: email,
                password: senha,
            });

            alert("Cadastro realizado com sucesso!");
            navegarPara("/login");

        } catch (erro) {
            console.log(erro);
            console.log(erro.response);

            alert(JSON.stringify(erro.response?.data));

            setMensagemErro(
                erro.response?.data?.message || "Erro ao cadastrar usuário."
            );
        }
    }

    return (

        <div>

            <h1>Cadastro</h1>

            {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}

            <form onSubmit={handleRegisterSubmit}>

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">
                    Cadastrar
                </button>

            </form>

            <br />

            <p>
                Já possui conta?{" "}
                <Link to="/login">
                    Fazer Login
                </Link>
            </p>

        </div>

    );

}

export default Register;