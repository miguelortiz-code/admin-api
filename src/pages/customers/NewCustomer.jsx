import { useState } from "react"


export const NewCustomer = () => {
    
    const [customer, setCustomer] = useState({
    name: '',
    lastname: '',
    company: '',
    email: '',
    telefono: ''
});
    

// Leer datos del formulario
const newCustomer  = e =>{
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
                        onChange={newCustomer}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text"
                        placeholder="Apellido Cliente"
                        name="lastname" 
                        onChange={newCustomer}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text"
                        placeholder="Empresa Cliente"
                        name="company" 
                        onChange={newCustomer}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email"
                        placeholder="Email Cliente"
                        name="email" 
                        onChange={newCustomer}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="email"
                        placeholder="Teléfono Cliente"
                        name="telefono" 
                        onChange={newCustomer}
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