import { useState } from "react"
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom"
import {customerAxios} from '../../config/axios'

export const UpdatedCustomer = () => {
    
    // Obtener el id del cliente mediante el params
    const {id} = useParams()
    console.log(id);


    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
    name: '',
    lastname: '',
    company: '',
    email: '',
    telefono: ''
});
    

// Leer datos del formulario
const getData  = e =>{
    // Almacenar lo que el usuario en el estate
    setCustomer({
        // Obtener una copia del state actual
        ...customer,
        [e.target.name]  : e.target.value
    })
    // console.log(customer)
}

// Función para validar le formulario
const checkCustomer = () =>{
    // Destructuring
    const {name, lastname, company, email, telefono} = customer

    let validate =  !name.length || !lastname.length || !company.length || !email.length || !telefono.length 

    // return ture o false
    return  validate
}



    return(
        <>
            <h2>Nuevo Cliente</h2>
            <form>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text"
                        placeholder="Nombre Cliente"
                        name="name" 
                        onChange={getData}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text"
                        placeholder="Apellido Cliente"
                        name="lastname" 
                        onChange={getData}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text"
                        placeholder="Empresa Cliente"
                        name="company" 
                        onChange={getData}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email"
                        placeholder="Email Cliente"
                        name="email" 
                        onChange={getData}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="text"
                        placeholder="Teléfono Cliente"
                        name="telefono" 
                        onChange={getData}
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Cliente" 
                        disabled= {checkCustomer()}
                    />
                </div>
            </form>
        </>
    )
}