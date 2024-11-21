import BorrarEdificio from "./BorrarEdificio";
import BuscarEdificio from "./BuscarEdificio";
import CrearEdificio from "./CrearEdificio";
import MostrarEdificios from "./MostrarEdificios";

export default function Edificios(){
    return(
        <div>
            <div className="paginaOrden">
                <div className="funciones">
                <h1>Edificios</h1>
                    <p className="letra">Buscar</p>
                    <BuscarEdificio />
                    <CrearEdificio/>
                    <BorrarEdificio/>
                </div>
                <div>
                    <MostrarEdificios/> 
                </div>
            </div>
        </div>
    )    
}