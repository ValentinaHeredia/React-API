import BuscarEdificio from "../PagEdificios/BuscarEdificio";
import MostrarEmpleados from "./MostrarEmpleados";

export default function Empleado(){
    return(
        <div>
            <h1>Empleados</h1>
            <BuscarEdificio/>
            <MostrarEmpleados/>
        </div>
    )
}