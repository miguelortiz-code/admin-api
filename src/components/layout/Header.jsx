import { useContext } from "react";
import { CRMContext } from "../../context/CRMContext.jsx";

export const Header = () => {
  const [auth, setAuth] = useContext(CRMContext);
  console.log(auth);
  return (
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <h1>CRM - Administrador de Clientes</h1>
          {auth.auth ? (
            <button type="button" className="btn btn-rojo">
              <i className=" far fa-times-circle"></i>
              Cerrar Sesión
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};
