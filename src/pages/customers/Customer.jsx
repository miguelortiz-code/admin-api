import { useEffect, useState } from 'react';
import { customerAxios } from '../../config/axios.js';

export const Customers = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerAxios.get('/customers');
        setCustomers(response.data.customers);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <h1>Clientes</h1>
      <ul className='listado-clientes'>
        {customers.map(customer => (
        //   <li key={customer.id}>
        //     <p>{customer.nombre}</p>
        //     <p>{customer.email}</p>
        //   </li>
        console.log(customer)
        ))}
      </ul>
    </>
  );
};