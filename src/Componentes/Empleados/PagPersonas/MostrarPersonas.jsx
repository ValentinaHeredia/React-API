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
                            <div className="boxDatos">
                                <div className="boxDato">Nombre: {p.nombre}</div>
                                <div className="boxDato">Documento: {p.documento}</div>
                                <div></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}