import BorrarEdificio from "./BorrarEdificio";
import BuscarEdificio from "./BuscarEdificio";
import CrearEdificio from "./CrearEdificio";
import MostrarEdificios from "./MostrarEdificios";

export default function Edificios(){
    return(
        <div>
            <h1>Edificios</h1>
            <p>Buscar</p>
            <BuscarEdificio />
            <CrearEdificio/>
            <BorrarEdificio/>
            <MostrarEdificios/>
        </div>
    )    
}