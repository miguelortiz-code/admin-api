import { useEffect, useState } from "react";
import { customerAxios } from "../../config/axios";
import { DetailsOrder } from "./DetailsOrder";
import {Spinner} from '../../components/layout/Spinner'

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  // UseEffect para consultar la api cuando cargue
  useEffect(() => {
    const fetchOrders = async () => {
      // Obtener los pedidos
      try {
          const response = await customerAxios.get("/orders");
            setOrders(response.data.orders);
      } catch (error) {
        console.error('Error al obtener las ordenes:', error);
      }
    };
    // Llamar a la api
    fetchOrders();
  }, []);

    // Spinner De Carga
    if(!orders.length) return <Spinner />

  return (
    <>
      <h2>Pedidos Realizados</h2>
      <ul className="listado-pedidos">
        {orders.map(order => (
            <DetailsOrder
                key={order._id}
                order ={order} 
            />
        ))}
      </ul>
    </>
  );
};
