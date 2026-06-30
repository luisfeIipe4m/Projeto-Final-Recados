import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import RecadoForm from "../components/RecadoForm";
import RecadoItem from "../components/RecadoItem";

function Recados() {
    const navegarPara = useNavigate();
    const [recados, setRecados] = useState([]);

    useEffect(() => {
        buscarRecados();
    }, []);

    async function buscarRecados() {
        try {
            const { data: recadosDoUsuario } = await api.get("/recados");
            setRecados(recadosDoUsuario);
        } catch (erro) {
            console.log(erro);
        }
    }

    async function criarRecado(dadosDoNovoRecado) {
        try {
            const { data: recadoCriado } = await api.post("/recados", dadosDoNovoRecado);
            setRecados((recadosAtuais) => [recadoCriado, ...recadosAtuais]);
        } catch (erro) {
            console.log(erro);
        }
    }

    async function excluirRecado(idDoRecado) {
        if (!window.confirm("Deseja excluir este recado?")) {
            return;
        }

        try {
            await api.delete(`/recados/${idDoRecado}`);

            setRecados((recadosAtuais) =>
                recadosAtuais.filter((recado) => recado.id !== idDoRecado)
            );
        } catch (erro) {
            console.log(erro);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        navegarPara("/login");
    }

    return (

        <div>

            <h1>Lista de Recados</h1>

            <button onClick={logout}>
                Sair
            </button>

            <hr />

            <RecadoForm onCriar={criarRecado} />

            <hr />

            {recados.map((recado) => (
                <RecadoItem
                    key={recado.id}
                    recado={recado}
                    onExcluir={excluirRecado}
                />
            ))}

        </div>

    );

}

export default Recados;