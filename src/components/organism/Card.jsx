import { Link} from "react-router-dom";
import Swal from 'sweetalert2';
import {customerAxios} from '../../config/axios'

export const Card = ({customer}) => {
  
  const {_id, name, lastname, company, email, telefono} = customer;
  
  const deleteCustomer = id => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡Un cliente eliminado no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      
      customerAxios.delete(`/customer/${id}`)
      .then(res =>{
        if (result.isConfirmed) Swal.fire({        
        title: "Eliminado!",
        text: res.data.message,
        icon: "success"
      });
      });
    });
  }

  return (
    <>
      <li className="cliente">
        <div className="info-cliente">
          <p className="nombre">{name} {lastname}</p>
          <p className="empresa">{company}</p>
          <p>{email}</p>
          <p>Tel:{telefono}</p>
        </div>
        <div className="acciones">
          <Link to={`/customers/${_id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Cliente
          </Link>
          <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => deleteCustomer(_id)}>
            <i className="fas fa-times"></i>
            Eliminar Cliente
          </button>
        </div>
      </li>
    </>
  );
};
