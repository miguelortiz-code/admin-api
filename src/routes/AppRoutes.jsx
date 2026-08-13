import { Routes, Route } from "react-router-dom";
import { Customers } from "../pages/customers/Customer";
import { NewCustomer } from "../pages/customers/NewCustomer";
import {UpdatedCustomer} from '../pages/customers/UpdateCustumer';
import {Products} from '../pages/products/Products'
import {NewProduct} from '../pages/products/NewProduct';
import {UpdateProduct} from '../pages/products/UpdateProduct';
import {Orders} from '../pages/orders/Orders'

export const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element= {<Customers />} />   {/* dashboard */}
            <Route path="/customers/new-customer" element= {< NewCustomer />} /> {/* Nuevo Cliente */} 
            <Route path="/customers/:id" element={ <UpdatedCustomer />} />  {/* Actualizar cliente */}
            {/* productos */}
            <Route path="/products" element= {< Products /> } /> 
            <Route path="/products/new-product" element={< NewProduct />} />
            <Route path="/product/:id" element={< UpdateProduct />} />
                
            {/* Pedidos */}
            <Route path="/orders" element= {< Orders /> } />
        </Routes>
    )
}