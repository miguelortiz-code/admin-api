import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { customerAxios } from "../../config/axios";
import { Spinner } from "../../components/layout/Spinner";

export const UpdateProduct = () => {
  // Obtener ID del producto desde la URL
  const { id } = useParams();

  // State del producto
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // State para la nueva imagen
  const [images, setImage] = useState(null);

  // State de carga
  const [loading, setLoading] = useState(true);

  // Consultar producto
  useEffect(() => {
    const queryApi = async () => {
      try {
        const productQuery = await customerAxios.get(`/product/${id}`);

        setProduct(productQuery.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    queryApi();
  }, [id]);

  // Leer datos del formulario
  const readData = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar nueva imagen
  const readImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  // Extraer valores
  const { name, price, image } = product;

  // Mostrar spinner únicamente mientras consulta la API
  if (loading) return <Spinner />;

  return (
    <>
      <h2>Editar Producto</h2>

      <form>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>

          <input
            type="text"
            placeholder="Nombre Producto"
            name="name"
            onChange={readData}
            value={name}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>

          <input
            type="number"
            name="price"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={readData}
            value={price}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>

          {image && (
            <img
              src={`http://localhost:5000/uploads/products/${image}`}
              alt={`Imagen del producto ${name}`}
              width={300}
            />
          )}

          <input
            type="file"
            name="image"
            onChange={readImage}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Actualizar Producto"
          />
        </div>
      </form>
    </>
  );
};