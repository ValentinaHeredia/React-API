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
import TodasBusquedas from "./TodasBusquedas";

export default function Reclamos(){
    return(
        <div>
            <div className="container">
                <div className="busquedaGridPersonas">
                    <TodasBusquedas/>
                </div>
                <div className="funcionesGridPersonas">
                    <div className="funciones">
                        {/* 
                        <ReclamoPorEdificio/>
                        <ReclamoPorUnidad/>
                        <ReclamosPorPersona/>
                        <ObtenerReclamosPorRangoFechas/>
                        <ObtenerReclamoACporEdificio/>
                        */}
                        <LugarReclamo/>
                        <BorrarReclamo/>
                        <CambiarEstado/>
                        <ObtenerReclamoEstado/>
                        <br />
                        <ObtenerReclamosPorTipo/>

                    </div>
                </div>
                <div className="resultadosGridPersonas">
                    <MostrarReclamos/> 
                </div>
            </div>
        </div>
    )
}