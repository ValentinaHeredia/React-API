import BuscarUsuario from "./BuscarUsuario";
import MostrarUsuario from "./MostrarUsuario";

export default function Usuario(){
    return(
        <div>
            <h1>Usuarios</h1>
            <BuscarUsuario/>
            <MostrarUsuario/>
        </div>
    )
}