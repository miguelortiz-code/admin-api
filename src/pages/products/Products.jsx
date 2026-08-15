import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customerAxios } from '../../config/axios.js';


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
    }, []);



    return(
        <>
            <h2>Productos</h2>
            <Link  to={"/products/new-product"}   className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">VueJS</p>
                        <p className="precio">$25.00 </p>
                        <img src="img/1.jpg" />
                    </div>

                    <div className="acciones">
                        <a href="#" className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </a>

                        <button type="button" className="btn btn-rojo btn-eliminar">
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
            </ul> 
        </>
    )
};