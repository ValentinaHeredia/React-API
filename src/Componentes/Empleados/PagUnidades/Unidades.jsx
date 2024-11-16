import BuscarEdificio from "../PagEdificios/BuscarEdificio";
import BorrarUnidad from "./BorrarUnidad";
import BuscarUnidades from "./BuscarUnidades";
import CrearUnidad from "./CrearUnidad";
import MostrarUnidades from "./MostrarUnidades";

export default function Unidades(){
    return(
        <div>
            <h1>Unidades</h1>
            <p>Buscar</p>
            <BuscarUnidades/>
            <CrearUnidad/>
            <BorrarUnidad/>
            <MostrarUnidades/>
        </div>
    )
}