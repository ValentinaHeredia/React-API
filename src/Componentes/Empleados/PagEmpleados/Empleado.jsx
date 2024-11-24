import BorrarEmpleado from "./BorrarEmpleado";
import BuscarEmpleado from "./BuscarEmpleado";
import CrearEmpleado from "./CrearEmpleado";
import ModificarContraseniaE from "./ModificarContraseniaE";
import MostrarEmpleados from "./MostrarEmpleados";

export default function Empleado(){
    return(
        <div>
            <div className="container">
            <div className="buscarGrid">
                    <BuscarEmpleado />
                </div>
                <div className="funcionesGrid">
                    <div className="funciones">
                        <h1>Empleados</h1>
                        <CrearEmpleado/>
                        <BorrarEmpleado/>
                        <ModificarContraseniaE/>
                    </div>
                </div>
                <div className="resultadosGrid">
                    <MostrarEmpleados/> 
                </div>
            </div>
        </div>
    )
}