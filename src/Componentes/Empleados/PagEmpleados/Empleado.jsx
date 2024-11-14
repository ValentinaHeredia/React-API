import BorrarEmpleado from "./BorrarEmpleado";
import BuscarEmpleado from "./BuscarEmpleado";
import CrearEmpleado from "./CrearEmpleado";
import ModificarContraseniaE from "./ModificarContraseniaE";
import MostrarEmpleados from "./MostrarEmpleados";

export default function Empleado(){
    return(
        <div>
            <h1>Empleados</h1>
            <BuscarEmpleado />
            <br/>
            <CrearEmpleado/>
            <br/>
            <BorrarEmpleado/>
            <br/>
            <ModificarContraseniaE/>
            <br/>
            <MostrarEmpleados/>
        </div>
    )
}