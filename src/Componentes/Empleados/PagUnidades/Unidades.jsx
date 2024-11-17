import BuscarEdificio from "../PagEdificios/BuscarEdificio";
import BorrarUnidad from "./BorrarUnidad";
import BuscarUnidades from "./BuscarUnidades";
import CrearUnidad from "./CrearUnidad";
import LiberarUnidad from "./LiberarUnidad";
import MostrarUnidades from "./MostrarUnidades";
import TransferirUnidad from "./TransferirUnidad";

export default function Unidades(){
    return(
        <div>
            <h1>Unidades</h1>
            <p>Buscar</p>
            <BuscarUnidades/>
            <CrearUnidad/>
            <BorrarUnidad/>
            <TransferirUnidad/>
            <LiberarUnidad/>
            <MostrarUnidades/>
        </div>
    )
}