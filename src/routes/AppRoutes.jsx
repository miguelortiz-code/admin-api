import { Routes, Route } from "react-router-dom";
import { Customers } from "../pages/customers/Customer";
import {Products} from '../pages/products/Products'
import {Orders} from '../pages/orders/Orders'

export const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element= {<Customers />} />
            <Route path="/products" element= {< Products /> } />
            <Route path="/orders" element= {< Orders /> } />
        </Routes>
    )
}