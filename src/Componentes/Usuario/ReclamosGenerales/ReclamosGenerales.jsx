import CrearReclamo from "../MisReclamo/CrearReclamo";
import ReclamosAreaComun from "./ReclamosAreaComun";

export default function ReclamosGenerales(){
    return(
        <div>
            <div className="container">
                <div className="funcionesGridPersonas">
                    <div className="funciones">
                        <CrearReclamo/>
                    </div>
                </div>
                <div className="resultadosGridPersonas">
                    <ReclamosAreaComun/>
                </div>
            </div>
        </div>
    )
}