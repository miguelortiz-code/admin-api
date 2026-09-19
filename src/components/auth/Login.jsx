export const Login = () => {


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
              onChange={readData}
            />
          </div>
        </form>
      </div>

      <input
        type="submit"
        value="Iniciar Sesión"
        className="btn btn-verde btn-block"
      />
    </div>
  );
};