import React, {useState, useEffect} from "react";

export default function MostrarUnidades(){
    const[unidadesList, setUnidadesList] = useState([]);

    async function getUnidades() {
        let respuesta = await fetch("http://localhost:8081/api/unidades/listarUnidades");
        let unidades = await respuesta.json();
        console.log(unidades);
        setUnidadesList(unidades)
    }

    useEffect(
        () => {getUnidades()}, []
    )

    return(
        <div>
            <div>
                {
                    unidadesList.map( (u) => (
                        <div>
                            <div className="box-conteiner">
                                <div className="caja">{u}</div>
                                <div className="caja">{u}</div>
                                <div></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}