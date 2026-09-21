import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Customers } from "../pages/customers/Customer";
import { NewCustomer } from "../pages/customers/NewCustomer";
import {UpdatedCustomer} from '../pages/customers/UpdateCustumer';
import {Products} from '../pages/products/Products'
import {NewProduct} from '../pages/products/NewProduct';
import {UpdateProduct} from '../pages/products/UpdateProduct';
import {Orders} from '../pages/orders/Orders'
import {NewOrder} from '../pages/orders/NewOrder'
import { Login } from "../components/auth/Login";
import { CRMContext, CRMProvider } from "../context/CRMContext"; 

export const AppRoutes = () =>{
    // Utilizar context en el componente
    const [auth, setAuth] = useContext(CRMContext)
    
    return(

        <CRMProvider value= {[auth, setAuth]}>
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
                <Route path="/orders/new-order/:id" element={< NewOrder /> } />
                {/* Login */}
                <Route path="/login" element={< Login /> } />
            </Routes>
        </CRMProvider>
    )
}