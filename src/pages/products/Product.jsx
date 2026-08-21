import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import { customerAxios } from '../../config/axios.js';

export const Product = ({product}) => {

  const {_id, name, price, image} = product
  

  // Elimina un producto
  const deleteProduct = (id) =>{
    Swal.fire({
      title: "¿Estás seguro de eliminar este producto?",
      text: "¡Una vez eliminado, no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed)
        customerAxios.delete(`/product/${id}`)
        .then(res =>{
          if(res.status === 200){
            Swal.fire({
                title: "Eliminado!",
                text: result.data.message,
                icon: "success"
            });  
          }
        })
    });
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