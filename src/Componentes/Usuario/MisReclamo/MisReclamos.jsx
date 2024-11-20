import CrearReclamo from "./CrearReclamo";
import CrearReclamoAreaComun from "./CrearReclamoAreaComun";
import MostrarMisReclamos from "./MostrarMisReclamo";

export default function MisReclamos(){
    return(
        <div>
            <CrearReclamo/>
            <CrearReclamoAreaComun/>
            <MostrarMisReclamos/>
        </div>
    )
}