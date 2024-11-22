import BorrarPersonas from "./BorrarPersonas";
import BuscarPersona from "./BuscarPersona";
import CrearPersona from "./CrearPersonas";
import MostrarPersonas from "./MostrarPersonas";

export default function Personas(){
    return(
        <div>
            <BuscarPersona/>
            <h1>Personas</h1>
            <CrearPersona/>
            <BorrarPersonas/>
            <MostrarPersonas/>
        </div>
    )
}