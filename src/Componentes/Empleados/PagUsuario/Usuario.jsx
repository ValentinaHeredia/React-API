import BorrarUsuario from "./BorrarUsuario";
import BuscarUsuario from "./BuscarUsuario";
import CrearUsuario from "./CrearUsuario";
import ModificarContrasenia from "./ModificarContrasenia";
import MostrarUsuario from "./MostrarUsuario";

export default function Usuario(){
    return(
        <div>
            <h1>Usuarios</h1>
            <BuscarUsuario/>
            <CrearUsuario/>
            <BorrarUsuario/>
            <ModificarContrasenia/>
            <MostrarUsuario/>
        </div>
    )
}