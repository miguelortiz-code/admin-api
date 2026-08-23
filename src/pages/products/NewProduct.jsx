import { useState } from "react";

export const NewProduct = () =>{
    
    // producto = state, setState = guardarProducto
    const [product, setProducts] = useState({
        name: '',
        price: ''
    });
    // archivo/ file = state, setFile = Guardar imagen
    const [image, setImage] = useState('');

    // Leer datos del formulario
    const readData =  e => {
        setProducts({
            // Obtener copia del state
            ...product,
            [e.target.name] : e.target.value
        });
        console.log(product);
    }

    // Coloca la imagen en el state
    const readImage = e => {
        const file = e.target.files[0];
        setImage(file);
    };
    
    return(
        <>
            <h2>Nuevo Producto</h2>

            <form>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="name" onChange={readData}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="price" min="0.00" step="0.01" placeholder="Precio" onChange={readData}/>
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" onChange={readImage} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                </div>
            </form>
        
        </>
    )
};