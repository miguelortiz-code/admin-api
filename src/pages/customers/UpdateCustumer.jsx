import { useState, useEffect} from "react"
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom"
import {customerAxios} from '../../config/axios'

export const UpdatedCustomer = () => {
    
    // Obtener el id del cliente mediante el params
    const {id} = useParams();


    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
    name: '',
    lastname: '',
    company: '',
    email: '',
    telefono: ''
});
   

// Utilizar useEffect cuando el componente carga y realizar la consulta a la api
useEffect(() => {
    const queryAPI = async () => {
        const customerQuery = await customerAxios.get(`/customer/${id}`);
        setCustomer(customerQuery.data.data);
    }
    queryAPI();
}, [id]);


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


// Enviar una petición por axiós para actualizar al cliente
const updatedeCustomer = (e) => {
    e.preventDefault();
    // Enviar la petición  por axios
    customerAxios.put(`/customer/${id}`, customer)
            .then(() => {
            //  ÉXITO
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire({
                icon: "success",
                text: "Cliente actualizado correctamente",
            }).then(() => {
                navigate('/');
            });
        })
        .catch(error => {
            // ERROR
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire({
                icon: "error",
                text: error.response?.data?.message || "Error al crear el cliente"
            });
        });
}


// Función para validar le formulario
const checkCustomer = () => {
    const {name, lastname, company, email, telefono} = customer

    if(!name || !lastname || !company || !email || !telefono) return true

    let validate = !name.length || !lastname.length || !company.length || !email.length || !telefono.length

    return validate
}


    return(
        <>
            <h2>Edita Cliente</h2>
            <form
                onSubmit={updatedeCustomer}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text"
                        placeholder="Nombre Cliente"
                        name="name" 
                        onChange={getData}
                        value={customer.name || ''}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text"
                        placeholder="Apellido Cliente"
                        name="lastname" 
                        onChange={getData}
                        value={customer.lastname || ''}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text"
                        placeholder="Empresa Cliente"
                        name="company" 
                        onChange={getData}
                        value={customer.company || ''}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email"
                        placeholder="Email Cliente"
                        name="email" 
                        onChange={getData}
                        value={customer.email || ''}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="text"
                        placeholder="Teléfono Cliente"
                        name="telefono" 
                        onChange={getData}
                        value={customer.telefono || ''}
                    
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit"
                        className="btn btn-azul"
                        value="Actualiza Cliente" 
                        disabled= {checkCustomer()}
                    />
                </div>
            </form>
        </>
    )
}