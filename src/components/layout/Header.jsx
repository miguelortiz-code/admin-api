import { useContext } from "react";
import { CRMContext } from "../../context/CRMContext.jsx";
import { useNavigate } from "react-router-dom";


export const Header = () => {
  const [auth, setAuth] = useContext(CRMContext);
  // console.log(auth);
  const navigate= useNavigate();
  const logout = () =>{
    // Remover el token y cerrar sesión
    setAuth({
      token: '',
      auth: false
    });

    // Eliminar token de localStorage 
    localStorage.setItem('token',  '');

    // redireccionar
    navigate('/login');
  };

  return (
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <h1>CRM - Administrador de Clientes</h1>
          {auth.auth ? (
            <button type="button" className="btn btn-rojo" onClick={logout}>
              <i className=" far fa-times-circle"></i>
              Cerrar Sesión
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};
