import BorrarEdificio from "./BorrarEdificio";
import BuscarEdificio from "./BuscarEdificio";
import CrearEdificio from "./CrearEdificio";
import MostrarEdificios from "./MostrarEdificios";

export default function Edificios(){
    return(
        <div>
            <div className="container">
                <div className="buscarGrid">
                    <BuscarEdificio />
                </div>
                <div className="funcionesGrid">
                    <div className="funciones">
                        <h1>Edificios</h1>
                        <CrearEdificio/>
                        <BorrarEdificio/>
                    </div>
                </div>
                <div className="resultadosGrid">
                    <MostrarEdificios/> 
                </div>
            </div>
        </div>
    )    
}