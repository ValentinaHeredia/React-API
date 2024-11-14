import BuscarEdificio from "../PagEdificios/BuscarEdificio";
import BuscarUnidades from "./BuscarUnidades";
import MostrarUnidades from "./MostrarUnidades";

export default function Unidades(){
    return(
        <div>
            <h1>Unidades</h1>
            <BuscarUnidades/>
            <MostrarUnidades/>
        </div>
    )
}