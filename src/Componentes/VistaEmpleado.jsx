import NavbarEmpleado from "./Navbars/NavbarEmpleado";

import Edificios from './Empleados/PagEdificios/Edificios';
import Empleado from './Empleados/PagEmpleados/Empleado';
import Reclamos from './Empleados/PagReclamos/Reclamos';
import Usuario from './Empleados/PagUsuario/Usuario';
import Personas from './Empleados/PagPersonas/Personas';
import Unidades from './Empleados/PagUnidades/Unidades';

export default function VistaEmpleado(){
    return(
        <div>
            {/*
            <NavbarEmpleado/>
            <Edificios/>
            <Unidades/>

            <Empleado/>
            <Usuario/>
            <Personas/>
            */}
            <Reclamos/>
        </div>
    )
}