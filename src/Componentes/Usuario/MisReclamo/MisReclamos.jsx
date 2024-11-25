import CrearReclamo from "./CrearReclamo";
import CrearReclamoAreaComun from "./CrearReclamoAreaComun";
import ModificarClave from "./ModificarClave";
import MostrarMisReclamos from "./MostrarMisReclamo";

export default function MisReclamos(){
    return(
        <div>
            <div className="container">
                <div className="funcionesGridPersonas">
                    <ModificarClave/>
                </div>
                <div className="resultadosGridPersonas">
                    <MostrarMisReclamos/>
                </div>
            </div>
        </div>
    )
}