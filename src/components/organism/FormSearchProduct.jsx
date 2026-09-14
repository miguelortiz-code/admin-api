import '../../../public/css/formSearchProduct.css'

export const FormSearchProduct = (props) => {
    return (
        <>
            <form onSubmit={props.searchProduct}>
                <legend>Busca un Producto y agrega una cantidad</legend>

                <div className="campo campo-buscador">
                    <label>Productos:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Productos" 
                        name="productos" 
                        onChange={props.readDataSearch}
                        autoComplete="off"
                    />

                    {props.suggestions.length > 0 && (
                        <ul className="lista-sugerencias">
                            {props.suggestions.map((producto) => (
                                <li key={producto._id} onClick={() => props.selectProduct(producto)}>
                                    {producto.name} - ${Number(producto.price).toLocaleString('es-CO')}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </form>
        </>
    )
}