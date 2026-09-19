import { useState } from "react";

export const Login = () => {
  const [credentials, setCredentials] = useState({});

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
