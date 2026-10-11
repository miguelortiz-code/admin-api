import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customerAxios } from "../../config/axios.js";
import { Product } from "./Product";
import { Spinner } from "../../components/layout/Spinner";
import { CRMContext } from "../../context/CRMContext.jsx";

export const Products = () => {
  // products = State, setProducts = función para guardar el state
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);

  // UseEffect para consultar la api cuando cargue
  useEffect(() => {
    // Si no hay token, redirigir al login
    if (auth.token === "") {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        // Llamar a la API enviando el token
        const response = await customerAxios.get("/products", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error al obtener productos:", error);

        // Error de autorización
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchProducts();
  }, [auth.token, navigate]);

  // Spinner De Carga
  if (!products.length) return <Spinner />;

  return (
    <>
      <h2>Productos</h2>
      <Link to={"/products/new-product"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </ul>
    </>
  );
};