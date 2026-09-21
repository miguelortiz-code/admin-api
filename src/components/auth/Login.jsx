import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {customerAxios} from '../../config/axios';
import { CRMContext } from "../../context/CRMContext"; 

export const Login = () => {
  // Auth y token
  const [auth, setAuth] =  useContext(CRMContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  
  // Iniciar sesión en el servidor
  const login = async (e) => {
    e.preventDefault();

    // Autenticar usuario
    try {
      const response = await customerAxios.post("/login", credentials);
      // Extraer token y colocarlo en el localstorage
      const {token } = response.data;
      localStorage.setItem('token', token);

      // Guardar el token en el state
      setAuth({
        token,
        auth: true
      });

      // Alerta
      Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        })
          .fire({
            icon: "success",
            text: '¡Has iniciado sesión de manera correcta!',
          })
          .then(() => {
            navigate("/");
          });

    } catch (error) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }).fire({
        icon: "error",
        text: error.response?.data?.message || "Error al iniciar sesion",
      });
    }
  };
  
  
  // Almacenar lo que el usuario escribe en el state
  const readData = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión </h2>
      <div className="contenedor-formulario">
        <form onSubmit={login}>
          <div className="campo">
            <label>Correo Electrónico:</label>
            <input
              type="text"
              name="email"
              placeholder="correo@gmail.com"
              required
              autoComplete="email"
              onChange={readData}
            />
          </div>

          <div className="campo">
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="*****"
              required
              autoComplete="current-password"
              onChange={readData}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesión"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
};
