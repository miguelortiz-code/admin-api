import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customerAxios } from '../../config/axios.js';
import {Card} from '../../components/organism/Card.jsx'
import {Spinner} from '../../components/layout/Spinner'

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
  }, [customers]);

      // Spinner De Carga
      if(!customers.length) return <Spinner />
  

  return (
    <>
      <h1>Clientes</h1>
      <Link  to={"/customers/new-customer"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className='listado-clientes'>
        {customers.map(customer => (
          <Card
          key={customer._id}
          customer={customer} />
        )) }
      </ul>
    </>
  );
};