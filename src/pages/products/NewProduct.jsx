import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { customerAxios } from "../../config/axios";

export const NewProduct = () => {
  const navigate = useNavigate();
  // producto = state, setState = guardarProducto
  const [product, setProducts] = useState({
    name: "",
    price: "",
  });
  // archivo/ file = state, setFile = Guardar imagen
  const [image, setImage] = useState("");

  // Guardar el producto en la base de datos.
  const addProduct = async (e) => {
    e.preventDefault();

    // Crear form data
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("image", image);

    // Almacenar en la BD
    try {
      const res = await customerAxios.post("/products/new-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
      // Lanzar alerta
      if (res.status === 201) {
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
            text: res.data.message,
          })
          .then(() => {
            navigate("/products");
          });
      }
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
        text: error.response?.data?.message || "Error al crear el cliente",
      });
    }
  };

  // Leer datos del formulario
  const readData = (e) => {
    setProducts({
      // Obtener copia del state
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Coloca la imagen en el state
  const readImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <>
      <h2>Nuevo Producto</h2>

      <form onSubmit={addProduct}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="name"
            onChange={readData}
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
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="imagen" onChange={readImage} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
          />
        </div>
      </form>
    </>
  );
};