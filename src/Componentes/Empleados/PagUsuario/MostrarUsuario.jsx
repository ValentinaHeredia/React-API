import React, {useState, useEffect} from "react";

export default function MostrarUsuario(){
    const[usuarioList, setUsuarioList] = useState([]);

    async function getUsuario() {
        let respuesta = await fetch("http://localhost:8081/api/usuarios/obtenerTodosLosUsuarios");
        let usuario = await respuesta.json();
        console.log(usuario);
        setUsuarioList(usuario)
    }

    useEffect(
        () => {getUsuario()}, []
    )

    return(
        <div>
            <div>
                {
                    usuarioList.map( (u) => (
                        <div>
                            <div className="boxDatos">
                                <div className="boxDato">{u.persona.documento}</div>
                                <div className="boxDato">{u.persona.nombre}</div>
                                <div></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}