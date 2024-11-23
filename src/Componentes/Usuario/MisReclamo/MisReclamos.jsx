import CrearReclamo from "./CrearReclamo";
import CrearReclamoAreaComun from "./CrearReclamoAreaComun";
import MostrarMisReclamos from "./MostrarMisReclamo";

export default function MisReclamos(){
    return(
        <div>
            <div className="container">
                <div className="funcionesGridPersonas">
                    <div className="funciones">
                        <CrearReclamo/>
                        <CrearReclamoAreaComun/>
                    </div>
                </div>
                <div className="resultadosGridPersonas">
                    <MostrarMisReclamos/>
                </div>
            </div>
        </div>
    )
}