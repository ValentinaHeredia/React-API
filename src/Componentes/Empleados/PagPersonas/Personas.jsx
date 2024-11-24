import BorrarPersonas from "./BorrarPersonas";
import BuscarPersona from "./BuscarPersona";
import CrearPersona from "./CrearPersonas";
import MostrarPersonas from "./MostrarPersonas";

export default function Personas(){
    return(
        <div>
            <div className="container">
                <div className="buscarGrid">
                    <BuscarPersona />
                </div>
                <div className="funcionesGrid">
                    <div className="funciones">
                        <h1>Personas</h1>
                        <CrearPersona/>
                        <BorrarPersonas/>
                    </div>
                </div>
                <div className="resultadosGrid">
                    <MostrarPersonas/> 
                </div>
            </div>
        </div>
    )
}