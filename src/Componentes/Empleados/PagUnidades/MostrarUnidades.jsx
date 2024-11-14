import React, {useState, useEffect} from "react";

export default function MostrarUnidades(){
    const[unidadesList, setUnidadesList] = useState([]);

    async function getUnidades() {
        let respuesta = await fetch("http://localhost:8081/api/unidades/obtenerTodasLasUnidades");
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
                            <div className="color">
                                <div className="box-conteiner">
                                    <div className="caja">{u.identificador}</div>
                                    <div className="caja">piso: {u.piso}</div>
                                    <div className="caja">numero: {u.numero}</div>
                                </div>
                                <div>
                                    <p>Habitado:</p>
                                    <div className="caja">{u.habitado}</div>
                                </div>
                                <div>
                                    <p>Dueños:</p>
                                    <div className="caja">{u.duenios.documento}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}