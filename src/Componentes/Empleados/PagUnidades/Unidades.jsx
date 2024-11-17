import BuscarEdificio from "../PagEdificios/BuscarEdificio";
import BorrarUnidad from "./BorrarUnidad";
import BuscarUnidades from "./BuscarUnidades";
import CrearUnidad from "./CrearUnidad";
import HabitarUnidad from "./HabitarUnidad";
import LiberarUnidad from "./LiberarUnidad";
import MostrarUnidades from "./MostrarUnidades";
import TransferirUnidad from "./TransferirUnidad";
import BuscarUnidadesEdificio from "./UnidadEdificio";

export default function Unidades(){
    return(
        <div>
            <h1>Unidades</h1>
            <p>Buscar</p>
            <BuscarUnidades/>
            <br />
            <BuscarUnidadesEdificio/>
            <br />
            <CrearUnidad/>
            <br />
            <BorrarUnidad/>
            <br />
            <TransferirUnidad/>
            <br />
            <LiberarUnidad/>
            <br />
            <HabitarUnidad/>
            <br />
            <MostrarUnidades/>

        </div>
    )
}