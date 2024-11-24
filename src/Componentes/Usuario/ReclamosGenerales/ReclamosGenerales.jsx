import CrearReclamo from "../MisReclamo/CrearReclamo";
import ReclamosAreaComun from "./ReclamosAreaComun";

export default function ReclamosGenerales(){
    return(
        <div>
            <div className="container">
                <div className="funcionesGridPersonas">
                    <div className="funciones">

                    </div>
                </div>
                <div className="resultadosGridPersonas">
                    <ReclamosAreaComun/>
                </div>
            </div>
        </div>
    )
}