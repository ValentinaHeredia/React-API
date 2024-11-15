import BorrarPersonas from "./BorrarPersonas";
import CrearPersona from "./CrearPersonas";
import MostrarPersonas from "./MostrarPersonas";

export default function Personas(){
    return(
        <div>
            <h1>Personas</h1>
            <CrearPersona/>
            <BorrarPersonas/>
            <MostrarPersonas/>
        </div>
    )
}