import { Routes, Route } from "react-router-dom";
import { Customers } from "../pages/customers/Customer";
import { NewCustomer } from "../pages/customers/NewCustomer";
import {UpdatedCustomer} from '../pages/customers/UpdateCustumer';
import {Products} from '../pages/products/Products'
import {Orders} from '../pages/orders/Orders'

export const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element= {<Customers />} />
            <Route path="/customers/new-customer" element= {< NewCustomer />} />
            <Route path="/customers/:id" element={ <UpdatedCustomer />} />
            <Route path="/products" element= {< Products /> } />
            <Route path="/orders" element= {< Orders /> } />
        </Routes>
    )
}