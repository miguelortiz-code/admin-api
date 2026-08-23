import { useState } from "react";

export const NewProduct = () =>{
    
    // producto = state, setState = guardarProducto
    const [product, setProducts] = useState({
        name: '',
        price: ''
    });
    // archivo/ file = state, setFile = Guardar imagen
    const [image, setImage] = useState('');
    
    return(
        <>
            <h2>Nuevo Producto</h2>

            <form>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                </div>
            </form>
        
        </>
    )
};