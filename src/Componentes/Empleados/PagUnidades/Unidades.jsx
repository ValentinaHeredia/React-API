import BorrarUnidad from "./BorrarUnidad";
import BuscarUnidades from "./BuscarUnidades";
import CrearUnidad from "./CrearUnidad";
import HabitarUnidad from "./HabitarUnidad";
import LiberarUnidad from "./LiberarUnidad";
import MostrarUnidades from "./MostrarUnidades";
import TransferirUnidad from "./TransferirUnidad";
import BuscarUnidadesEdificio from "./UnidadEdificio";

export default function Unidades(){
    return(
        <div>
            <div className="container">
                <div className="buscarGrid">
                    <BuscarUnidades />
                </div>
                <div className="funcionesGrid">
                    <div className="funciones">
                        <h1>Unidades</h1>
                        <CrearUnidad/>
                        <BorrarUnidad/>
                        <TransferirUnidad/>
                        <LiberarUnidad/>
                        <HabitarUnidad/>
                        <BuscarUnidadesEdificio/>
                    </div>
                </div>
                <div className="resultadosGrid">
                    <MostrarUnidades/>
                </div>
            </div>
        </div>
    )
}