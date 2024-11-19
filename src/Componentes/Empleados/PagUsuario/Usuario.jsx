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
            <h4>Buscar por Documento</h4>
            <BuscarUsuario/>
            <p>-----------------------------------------------------</p>
            <h4>Buscar habitantes por Unidad</h4>
            <BuscarHabitantesUnidad/>
            <p>-----------------------------------------------------</p>
            <h4>Buscar Habitante por Edificio</h4>
            <BuscarHabitantesUnidad/>
            <p>-----------------------------------------------------</p>
            <h4>Buscar Inquilino Por Unidad</h4>
            <BuscarInquilinosPorUnidad/>
            <p>-----------------------------------------------------</p>
            <h4>Dueño por Unidad</h4>
            <BuscarDuenioPorUnidad/>
            <p>-----------------------------------------------------</p>
            <h4>Dueño por Edificio</h4>
            <BuscarDueniosEdificio/>
            <p>-----------------------------------------------------</p>
            <CrearUsuario/>
            <br/>
            <BorrarUsuario/>
            <br/>
            <ModificarContrasenia/>
            <p>-----------------------------------------------------</p>
            <h4>Crear habitante</h4>
            <CrearHabitante/>
            <br/>
            <h4>Borrar habitante</h4>
            <BorrarHabitante/>
            <p>-----------------------------------------------------</p>
            <h4>Crear Dueño</h4>
            <CrearDuenio/>
            <br/>
            <h4>Borrar Dueño</h4>
            <BorrarDuenio/>
            <p>-----------------------------------------------------</p>
            <h4>Crear Inquilino</h4>
            <CrearInquilino/>
            <br/>
            <h4>Borrar Inquilino</h4>
            <BorrarInquilino/>
            <p>-----------------------------------------------------</p>
            <MostrarUsuario/>
        </div>
    )
}