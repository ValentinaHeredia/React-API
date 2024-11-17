import BuscarReclamos from "./BuscarReclamos";
import LugarReclamo from "./LugarReclamo";
import MostrarReclamos from "./MostrarReclamos";
import ReclamoPorEdificio from "./ReclamoPorEdificio";
import ReclamoPorUnidad from "./ReclamoPorUnidad";
import ReclamosPorPersona from "./ReclamosPersona";

export default function Reclamos(){
    return(
        <div>
            <h1>Reclamos</h1>
            <BuscarReclamos/>
            <p>Buscar por Edificio</p>
            <ReclamoPorEdificio/>
            <p>Buscar por Unidad</p>
            <ReclamoPorUnidad/>
            <p>Reclamos por Persona</p>
            <ReclamosPorPersona/>
            <p>Lugar Reclamo</p>
            <LugarReclamo/>
            <MostrarReclamos/>
        </div>
    )
}