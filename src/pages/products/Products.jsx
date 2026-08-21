import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customerAxios } from '../../config/axios.js';
import {Product} from './Product'

export const Products = () =>{

    // products = State, saveProduct = función para guardar el state
    const [products, setProducts] = useState([]);

    // UseEffect para consultar la api cuando cargue
    useEffect( () => {
        const fetchProducts =  async () => {
            try {
                const response = await customerAxios.get('/products');
               setProducts(response.data.products);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        }
        // Llamar a la API
        fetchProducts();
    }, [products]);



    return(
        <>
            <h2>Productos</h2>
            <Link  to={"/products/new-product"}   className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {products.map(product => (
                    <Product
                        key={product._id}
                        product={product}                    
                    />
                ))}
            </ul> 
        </>
    )
};