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
            <div className="container">
                <div className="busquedaGridPersonas">
                    <BuscarUsuario />
                </div>
                <div className="funcionesGridPersonas">
                    <div className="funciones">
                        <h1>Usuarios</h1>
                        <BuscarHabitantesUnidad/>
                        <BuscarHabitantesUnidad/>
                        <BuscarInquilinosPorUnidad/>
                        <BuscarDuenioPorUnidad/>
                        <BuscarDueniosEdificio/>
                        <CrearUsuario/>
                        <BorrarUsuario/>
                        <ModificarContrasenia/>
                        <CrearHabitante/>
                        <BorrarHabitante/>
                        <CrearDuenio/>
                        <BorrarDuenio/>
                        <CrearInquilino/>
                        <BorrarInquilino/>
                    </div>
                </div>
                <div className="resultadosGridPersonas">
                    <MostrarUsuario/> 
                </div>
            </div>
        </div>
    )
}