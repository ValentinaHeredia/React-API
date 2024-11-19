import CrearReclamo from "./Usuario/MisReclamo/CrearReclamo";
import CrearReclamoAreaComun from "./Usuario/MisReclamo/CrearReclamoAreaComun";

export default function VistaUsuario(){
    return(
        <div>
            <CrearReclamoAreaComun/>
            <CrearReclamo/>
        </div>
    )
}