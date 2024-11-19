import BorrarReclamo from "./BorrarReclamo";
import BuscarReclamos from "./BuscarReclamos";
import CambiarEstado from "./CambiarEstado";
import LugarReclamo from "./LugarReclamo";
import MostrarReclamos from "./MostrarReclamos";
import ObtenerReclamoACporEdificio from "./ObtenerReclamoACporEdificio";
import ObtenerReclamoEstado from "./ObtenerReclamoEstado";
import ObtenerReclamosPorRangoFechas from "./ObtenerReclamosPorRangoFechas";
import ObtenerReclamosPorTipo from "./ObtenerReclamosPorTipo";
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
            <p>Borrar reclamo</p>
            <BorrarReclamo/>
            <p>Cambiar estado</p>
            <CambiarEstado/>
            <p>Obtener reclamos por estado</p>
            <ObtenerReclamoEstado/>
            <p>Obtener reclamos por tipo de reclamos</p>
            <ObtenerReclamosPorTipo/>
            <p>Obtener reclamos por rango de fecha</p>
            <ObtenerReclamosPorRangoFechas/>
            <p>Obtener reclamos area comun por Edificio</p>
            <ObtenerReclamoACporEdificio/>
            <MostrarReclamos/>
        </div>
    )
}