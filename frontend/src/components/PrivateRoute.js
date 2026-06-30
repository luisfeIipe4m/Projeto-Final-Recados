import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

    const tokenDoUsuario = localStorage.getItem("token");

    const usuarioEstaLogado = !!tokenDoUsuario;

    if (!usuarioEstaLogado) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default PrivateRoute;