export const Card = ({customer}) => {
  
  const {name, lastname, company, email, telefono} = customer;
  
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
          <a href="#" className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Cliente
          </a>
          <button type="button" className="btn btn-rojo btn-eliminar">
            <i className="fas fa-times"></i>
            Eliminar Cliente
          </button>
        </div>
      </li>
    </>
  );
};
