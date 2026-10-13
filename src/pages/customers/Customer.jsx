import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customerAxios } from "../../config/axios.js";
import { Card } from "../../components/organism/Card.jsx";
import { Spinner } from "../../components/layout/Spinner";
import { CRMContext } from "../../context/CRMContext.jsx";

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);

  useEffect(() => {
    // Si no hay token, redirigir al login
    if (auth.token === "") {
      navigate("/login");
      return;
    }

    const fetchCustomers = async () => {
      try {
        // Llamar a la API enviando el token
        const response = await customerAxios.get("/customers", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setCustomers(response.data.customers);
      } catch (error) {
        console.error("Error al obtener clientes:", error);

        // Error de autorización
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchCustomers();
  }, [auth.token, navigate]);

  // Spinner De Carga
  if (!customers.length) return <Spinner />;

  return (
    <>
      <h1>Clientes</h1>
      <Link to={"/customers/new-customer"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {customers.map((customer) => (
          <Card key={customer._id} customer={customer} />
        ))}
      </ul>
    </>
  );
};