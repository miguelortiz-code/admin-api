import {Link} from 'react-router-dom';


export const Product = ({product}) => {

  const {_id, name, price, image} = product
  

  // Elimina un producto
  const deleteProduct = (id) =>{
    console.log(`Eliminando... ${id}`);
  }




  return(
       <li className="producto">
        <div className="info-producto">
          <p className="nombre">{name}</p>
          <p className="precio"> ${Number(price).toLocaleString('es-CO')} </p>
          {image ? (<img src={`http://localhost:5000/uploads/products/${image}`}  alt={`Imagen del producto ${name}`}/>) : '' }
        </div>

        <div className="acciones">
          <Link to={`/product/${_id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Producto
          </Link>

          <button 
            type="button" 
            className="btn btn-rojo btn-eliminar"
            onClick={() => deleteProduct(_id)}
            >
            <i className="fas fa-times"></i>
            Eliminar Cliente
          </button>
        </div>
      </li>

  )
}