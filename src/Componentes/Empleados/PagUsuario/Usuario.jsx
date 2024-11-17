import BorrarUsuario from "./BorrarUsuario";
import BuscarUsuario from "./BuscarUsuario";
import CrearDuenio from "./CrearDuenio";
import CrearHabitante from "./CrearHabitantes";
import CrearInquilino from "./CrearInquilino";
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
            <h4>Crear habitante</h4>
            <CrearHabitante/>
            <h4>Crear Dueño</h4>
            <CrearDuenio/>
            <h4>Crear Inquilino</h4>
            <CrearInquilino/>
            <MostrarUsuario/>
        </div>
    )
}