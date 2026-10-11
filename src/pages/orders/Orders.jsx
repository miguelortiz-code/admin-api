import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customerAxios } from "../../config/axios";
import { DetailsOrder } from "./DetailsOrder";
import { Spinner } from "../../components/layout/Spinner";
import { CRMContext } from "../../context/CRMContext.jsx";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);

  // UseEffect para consultar la api cuando cargue
  useEffect(() => {
    // Si no hay token, redirigir al login
    if (auth.token === "") {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      // Obtener los pedidos
      try {
        const response = await customerAxios.get("/orders", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error al obtener las ordenes:", error);

        // Error de autorización
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    // Llamar a la api
    fetchOrders();
  }, [auth.token, navigate]);

  // Spinner De Carga
  if (!orders.length) return <Spinner />;

  return (
    <>
      <h2>Pedidos Realizados</h2>
      <ul className="listado-pedidos">
        {orders.map((order) => (
          <DetailsOrder key={order._id} order={order} />
        ))}
      </ul>
    </>
  );
};