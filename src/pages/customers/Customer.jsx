import { useEffect } from 'react';
import {customerAxios} from '../../config/axios.js';


export const Customers = () =>{
    
    const checkApi = async () => {
        const queryCustomer  = await customerAxios.get('/customers');
        console.log(queryCustomer);
    };
    
    useEffect(() =>{
        checkApi();
    });


    return(
        <h1>Clientes</h1>
    )
};