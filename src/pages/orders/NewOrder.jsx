import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { customerAxios } from "../../config/axios.js";
import { FormSearchProduct } from "../../components/organism/FormSearchProduct.jsx";
import { FormAmountProduct } from "../../components/organism/FormAmountProduct.jsx";
import Swal from "sweetalert2";

export const NewOrder = () => {

  const navigate = useNavigate();

  // Obtener el ID del cliente
  const { id } = useParams();

  // State
  const [customer, setCustomer] = useState({});
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  // Actualizar el valor total
  const totalValue = () => {
    // Si el arrglo de productos = 0. El Total es = 0
    if (product.length === 0) {
      setTotal(0);
      return;
    }

    // Calular el nuevo Total
    let newTotal = 0;

    // Recorrer todos los productos, cantidades y precios
    product.map((product) => (newTotal += product.amount * product.price));

    // Almacenar el total
    setTotal(newTotal);
  };

  useEffect(() => {
    // Obtener la información del cliente
    const queryCustomer = async () => {
      const res = await customerAxios.get(`/customer/${id}`);
      setCustomer(res.data.data);
    };
    queryCustomer();
    totalValue();
  }, [product]);

  // Buscar sugerencias mientras escribes (con debounce)
  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      const result = await customerAxios.post(`/products/search/${search}`);
      setSuggestions(result.data);
    }, 300);

    // Limpia el timeout anterior si el usuario sigue escribiendo
    return () => clearTimeout(delayDebounce);
  }, [search]);

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

      // Validar si el producto ya fue agregado
      const productoExistente = product.some(
        (productState) => productState.product === resultProduct.product
      );

      if (productoExistente) {
        Swal.fire({
          icon: "warning",
          title: "Producto ya agregado",
          text: "Este producto ya está en tu pedido",
        });
        return;
      }

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

  // Agregar producto desde una sugerencia
  const selectProduct = (productoSeleccionado) => {
    let resultProduct = { ...productoSeleccionado };
    resultProduct.product = productoSeleccionado._id;
    resultProduct.amount = 0;

    // Validar si el producto ya fue agregado
    const productoExistente = product.some(
      (productState) => productState.product === resultProduct.product
    );

    if (productoExistente) {
      Swal.fire({
        icon: "warning",
        title: "Producto ya agregado",
        text: "Este producto ya está en tu pedido",
      });
      return;
    }

    setProduct([...product, resultProduct]);
    setSearch("");
    setSuggestions([]);
  };

  // Actualizar la cantidad de productos
  const subtractProducts = i => {
    // Copiar el arreglo original
    const allProducts = [...product];

    // Validar la cantidad inicial en 0
    if(allProducts[i].amount === 0) return;

    // Disminuir cantidad
    allProducts[i].amount--;

    // Almacenar la cantidad en el state
    setProduct(allProducts);
  }


  const addProducts = i => {
    // Copiar el arreglo 
    const allProducts = [...product];
    // Incremento de cantidad de los productos
    allProducts[i].amount++;
    // Almacenar la cantidad en el state
    setProduct(allProducts);
  }

  // Almacenar el pedido
 const placeAnOrder =  async e => {
    e.preventDefault();
    
    // Construir Objeto
    const order = {
      customer: id,
      order: product,
      total: total,
    };
    // console.log(order);
    // Guardar Producto
    try {
      const res = await customerAxios.post("/orders", order);
      // console.log(res);
      // Lanzar alerta
      if (res.status === 200) {
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
            navigate("/orders");
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

      <FormSearchProduct
        searchProduct={searchProduct}
        readDataSearch={readDataSearch}
        suggestions={suggestions}
        selectProduct={selectProduct}
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
        
      <p className="total">Total a pagar: <span>${Number(total).toLocaleString('es-CO')}</span></p>
      
      {
        total  > 0 ? 
        (
          <form
            onSubmit={placeAnOrder}
          >
            <input 
            type="submit" 
            className="btn btn-verde btn-block"
            value="Realizar Pedido"
            />
          </form>
        )
        :
        null
      }
    </>
  );
};