import React, {useState, useEffect} from "react";

export default function MostrarPersonas(){
    const[personasList, setPersonasList] = useState([]);

    async function getPersonas() {
        let respuesta = await fetch("http://localhost:8081/api/personas/obtenerTodasLasPersonas");
        let personas = await respuesta.json();
        console.log(personas);
        setPersonasList(personas)
    }

    useEffect(
        () => {getPersonas()}, []
    )

    return(
        <div>
            <div>
                {
                    personasList.map( (p) => (
                        <div>
                            <div className="box-conteiner color">
                                <div className="caja">{p.nombre}</div>
                                <div className="caja">{p.documento}</div>
                                <div></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}