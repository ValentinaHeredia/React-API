import BorrarEdificio from "./BorrarEdificio";
import BuscarEdificio from "./BuscarEdificio";
import CrearEdificio from "./CrearEdificio";
import MostrarEdificios from "./MostrarEdificios";

export default function Edificios(){
    return(
        <div>
            <h1>Edificios</h1>
            <div className="conteiner">
                <div className="funcionesSide rojo">
                    <p className="letra">Buscar</p>
                    <BuscarEdificio />
                    <CrearEdificio/>
                    <BorrarEdificio/>
                </div>
                <div className="resultadosSide azul">
                    <MostrarEdificios/> 
                </div>
            </div>
        </div>
    )    
}