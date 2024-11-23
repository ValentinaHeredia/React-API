import { Link, Outlet } from 'react-router-dom';

export default function UsuariosV(){
    return(
    <div>
        <nav>
            <ul className='navbarContenedor'>
                <li className='navbar'><Link to="MisReclamos" className='links'>Mis Reclamos</Link></li>
                <li className='navbar'><Link to="ReclamosGenerales" className='links'>Reclamos Generales</Link></li>
                <li className='navbar'><Link to="CreaReclamos" className='links'>Crear Reclamos</Link></li>
            </ul>
        </nav>
        <Outlet />
    </div>
    )
}