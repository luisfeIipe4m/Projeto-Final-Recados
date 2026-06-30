function RecadoItem({ recado, onExcluir }) {

    return (

        <div className="recado-card">

            <h3>{recado.titulo}</h3>

            <p className="recado-texto">{recado.texto}</p>

            <button className="botao-excluir" onClick={() => onExcluir(recado.id)}>
                Excluir
            </button>

        </div>

    );

}

export default RecadoItem;