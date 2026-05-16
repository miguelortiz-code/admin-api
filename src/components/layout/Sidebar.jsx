import { Link } from "react-router-dom";

export const Sidebar  =  () => (
    <aside className="sidebar col-3">
        <h2>Administración</h2>
        <nav className="navegacion">
            <Link to={"/"} className="clientes">Clientes</Link>
            <Link to={"/products"} className="productos">Productos</Link>
            <Link to={"/orders"} className="pedidos">Pedidos</Link>
        </nav>
    </aside>

);