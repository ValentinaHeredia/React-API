import BorrarDuenio from "./BorrarDueño";
import BorrarHabitante from "./BorrarHabitante";
import BorrarInquilino from "./BorrarInquilino";
import BorrarUsuario from "./BorrarUsuario";
import BuscarUsuario from "./BuscarUsuario";
import CrearDuenio from "./CrearDuenio";
import CrearHabitante from "./CrearHabitantes";
import CrearInquilino from "./CrearInquilino";
import CrearUsuario from "./CrearUsuario";
import BuscarDueniosEdificio from "./DueñoEdificio";
import BuscarDuenioPorUnidad from "./DueñoUnidad";
import BuscarHabitantesUnidad from "./HabitantesUnidad";
import BuscarInquilinosPorUnidad from "./InquilinosUnidad";
import ModificarContrasenia from "./ModificarContrasenia";
import MostrarUsuario from "./MostrarUsuario";

export default function Usuario(){
    return(
        <div>
            <h1>Usuarios</h1>
            <BuscarUsuario/>
            <BuscarHabitantesUnidad/>
            <h4>Buscar Inquilino Por unidad</h4>
            <BuscarInquilinosPorUnidad/>
            <h4>Dueño por Unidad</h4>
            <BuscarDuenioPorUnidad/>
            <h4>Dueño por Edificio</h4>
            <BuscarDueniosEdificio/>
            <CrearUsuario/>
            <BorrarUsuario/>
            <ModificarContrasenia/>
            <h4>Crear habitante</h4>
            <CrearHabitante/>
            <h4>Borrar habitante</h4>
            <BorrarHabitante/>
            <h4>Crear Dueño</h4>
            <CrearDuenio/>
            <h4>Borrar Dueño</h4>
            <BorrarDuenio/>
            <h4>Crear Inquilino</h4>
            <CrearInquilino/>
            <h4>Borrar Inquilino</h4>
            <BorrarInquilino/>

            <MostrarUsuario/>
        </div>
    )
}