import { Link, Outlet } from 'react-router-dom';

export default function EmpleadosV() {
    return (
    <div className="fondo">
        <nav>
        <ul>
            <li><Link to="Edificios">Edificios</Link></li>
            <li><Link to="Unidades">Unidades</Link></li>
            <li><Link to="Reclamos">Reclamos</Link></li>
            <li><Link to="Personas">Personas</Link></li>
            <li><Link to="Usuarios">Usuarios</Link></li>
            <li><Link to="Empleados">Empleados</Link></li>
        </ul>
        </nav>
        <Outlet /> {/* Aquí se renderizarán los componentes de las rutas hijas */}
    </div>
    );
}