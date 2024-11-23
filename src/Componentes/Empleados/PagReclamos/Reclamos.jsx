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
            <div className="container">
                <div className="buscarGrid">
                    <BuscarReclamos/>
                </div>
                <div className="funcionesGrid">
                    <div className="funciones">
                        <ReclamoPorEdificio/>
                        <ReclamoPorUnidad/>
                        <ReclamosPorPersona/>
                        <LugarReclamo/>
                        <BorrarReclamo/>
                        <CambiarEstado/>
                        <ObtenerReclamoEstado/>
                        <ObtenerReclamosPorTipo/>
                        <ObtenerReclamosPorRangoFechas/>
                        <ObtenerReclamoACporEdificio/>
                    </div>
                </div>
                <div className="resultadosGrid">
                    <MostrarReclamos/> 
                </div>
            </div>
        </div>
    )
}