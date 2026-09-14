export const DetailsOrder = ({order}) => {
  // console.log(order.order);
  const {customer} = order

  return (
    <>
        <li className="pedido">
          <div className="info-pedido">
            <p className="id">ID: {order._id}</p>
            <p className="nombre">Cliente: {customer.name} {customer.lastname}</p>

            <div className="articulos-pedido">
              <p className="productos">Artículos Pedido: </p>
              <ul>
                    {order.order.map((article) => (
                      <li key={order._id+article._id}>
                        <p>{article.product?.name || 'Producto no disponible'}</p>
                        <p>Precio: ${Number(article.product?.price || 0).toLocaleString('es-CO')}</p>
                        <p>Cantidad: {article.amount}</p>
                      </li>
                    ))}
              </ul>
            </div>
            <p className="total">Total:${Number(order?.total || 0).toLocaleString('es-CO')}</p>
          </div>
          <div className="acciones">
            <button type="button" className="btn btn-rojo btn-eliminar">
              <i className="fas fa-times"></i>
              Eliminar Pedido
            </button>
          </div>
        </li>
    </>
  );
};