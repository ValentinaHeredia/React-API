import BuscarEdificio from "./BuscarEdificio";
import MostrarEdificios from "./MostrarEdificios";

export default function Edificios(){
    return(
        <div>
            <h1>Edificios</h1>
            <p>Buscar</p>
            <BuscarEdificio />
            <MostrarEdificios/>
        </div>
    )    
}