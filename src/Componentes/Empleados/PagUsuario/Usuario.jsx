import BorrarDuenio from "./BorrarDueño";
import BorrarHabitante from "./BorrarHabitante";
import BorrarInquilino from "./BorrarInquilino";
import BorrarUsuario from "./BorrarUsuario";
import BuscarUsuario from "./BuscarUsuario";
import BuscarUsuarioPorEdificio from "./BuscarUsuarioPorEdificio";
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
import UsuarioBusqueda from "./UsuarioBusqueda";

export default function Usuario(){
    return(
        <div>
            <div className="container">
                <div className="busquedaGridPersonas">
                    <UsuarioBusqueda />
                </div>
                <div className="funcionesGridPersonas">
                    <div className="funciones">
                        <h1>Usuarios</h1>
                        <BuscarDuenioPorUnidad/>
                        <BuscarHabitantesUnidad/>
                        <BuscarInquilinosPorUnidad/>
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