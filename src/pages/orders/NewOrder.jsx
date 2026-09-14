import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { customerAxios } from "../../config/axios.js";
import { FormSearchProduct } from "../../components/organism/FormSearchProduct.jsx";
import { FormAmountProduct } from "../../components/organism/FormAmountProduct.jsx";
import Swal from "sweetalert2";

export const NewOrder = () => {
  // Obtener el ID del cliente
  const { id } = useParams();

  // State
  const [customer, setCustomer] = useState({});
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  useEffect(() => {
    // Obtener la información del cliente
    const queryCustomer = async () => {
      const res = await customerAxios.get(`/customer/${id}`);
      setCustomer(res.data.data);
    };
    queryCustomer();
  }, []);

  // Buscar Producto
  const searchProduct = async (e) => {
    e.preventDefault();
    // Obtener los productos de la busqueda
    const result = await customerAxios.post(`/products/search/${search}`);

    // Si no hay resultados mostrar alerta
    if (result.data[0]) {

      let resultProduct = result.data[0];

      // Agregar llave "producto" (Copia resultado)
      resultProduct.product = result.data[0]._id;
      resultProduct.amount = 0;

      // Guardar resultado en el State de product
      setProduct([...product, resultProduct]);
    } else {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }).fire({
        icon: "error",
        text: 'No hay resultados para tu busqueda',
      });
    }
  };
  // Almacenar una busqueda en el state
  const readDataSearch = (e) => {
    setSearch(e.target.value);
  };

  // Actualizar la cantidad de productos
  const subtractProducts = i => {
    console.log('Quitar producto...', i);
    // console.log(product);
  }


  const addProducts = i => {
    console.log('Sumar productos', i);
    // console.log(product);
  }



  return (
    <>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente: </h3>
        <p>
          {customer.name} {customer.lastname}
        </p>
        <p>{customer.email}</p>
        <p>{customer.telefono}</p>
      </div>

      <legend>Busca un Producto y agrega una cantidad</legend>
      <FormSearchProduct
        searchProduct={searchProduct}
        readDataSearch={readDataSearch}
      />

      <ul className="resumen">
        {product.map((product, index) =>(
          <FormAmountProduct 
            index={index}
            key={product.product}
            product={product}
            subtractProducts = {subtractProducts}
            addProducts = {addProducts}
          />
        ))}
      </ul>
      <div className="campo">
        <label>Total:</label>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          readOnly="readonly"
        />
      </div>
      <div className="enviar">
        <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
      </div>
    </>
  );
};
