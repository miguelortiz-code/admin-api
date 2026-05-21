import { Link } from "react-router-dom";


export const Card = ({customer}) => {
  
  const {_id, name, lastname, company, email, telefono} = customer;
  
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
          <button type="button" className="btn btn-rojo btn-eliminar">
            <i className="fas fa-times"></i>
            Eliminar Cliente
          </button>
        </div>
      </li>
    </>
  );
};
