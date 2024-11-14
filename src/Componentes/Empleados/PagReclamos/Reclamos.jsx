import BuscarReclamos from "./BuscarReclamos";
import MostrarReclamos from "./MostrarReclamos";
import ReclamoPorEdificio from "./ReclamoPorEdificio";
import ReclamoPorUnidad from "./ReclamoPorUnidad";

export default function Reclamos(){
    return(
        <div>
            <h1>Reclamos</h1>
            <BuscarReclamos/>
            <p>Buscar por Edificio</p>
            <ReclamoPorEdificio/>
            <p>Buscar por Unidad</p>
            <ReclamoPorUnidad/>
            <MostrarReclamos/>
        </div>
    )
}