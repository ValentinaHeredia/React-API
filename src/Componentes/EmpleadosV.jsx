import { Link, Outlet } from 'react-router-dom';

export default function EmpleadosV() {
    return (
    <div className="">
        <nav className="compu">
            <ul className='navbarContenedor'>
                <li className='navbar'><Link to="Edificios" className='links'>Edificios</Link></li>
                <li className='navbar'><Link to="Unidades" className='links'>Unidades</Link></li>
                <li className='navbar'><Link to="Reclamos" className='links'>Reclamos</Link></li>
                <li className='navbar'><Link to="Personas" className='links'>Personas</Link></li>
                <li className='navbar'><Link to="Usuarios" className='links'>Usuarios</Link></li>
                <li className='navbar'><Link to="Empleados" className='links'>Empleados</Link></li>
                <li className='navbar'><Link to="/" className='links'>Login</Link></li>
            </ul>
        </nav>
        <Outlet />
    </div>
    );
}