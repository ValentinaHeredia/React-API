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
                            <div className="box-conteiner color">
                                <div className="caja">{u.persona.documento}</div>
                                <div className="caja">{u.persona.nombre}</div>
                                <div></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}