import CrearReclamo from "./CrearReclamo";
import CrearReclamoAreaComun from "./CrearReclamoAreaComun";
import MostrarMisReclamos from "./MostrarMisReclamo";

export default function MisReclamos(){
    return(
        <div>
            <div className="container">
                <div className="funcionesGridPersonas">

                </div>
                <div className="resultadosGridPersonas">
                    <MostrarMisReclamos/>
                </div>
            </div>
        </div>
    )
}