export const FormAmountProduct = ({ product, subtractProducts, addProducts, index, deleteProductOrder }) => {

  const { name, price, amount } = product;

  return (
    <>
      <li>
        <div className="texto-producto">
          <p className="nombre">{name}</p>
          <p className="precio">${Number(price).toLocaleString('es-CO')}</p>
        </div>
        <div className="acciones">
          <div className="contenedor-cantidad">
            <i className="fas fa-minus" onClick={() => subtractProducts(index)}></i>
            <p>{amount}</p>
            <i className="fas fa-plus" onClick={() => addProducts(index)}></i>
          </div>
          <button type="button" className="btn btn-rojo" onClick={() => deleteProductOrder(product.product)}>
            <i className="fas fa-minus-circle"></i>
            Eliminar Producto
          </button>
        </div>
      </li>
    </>
  );
};
