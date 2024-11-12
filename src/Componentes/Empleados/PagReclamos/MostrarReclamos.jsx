import React, {useState, useEffect} from "react";

export default function MostrarReclamos(){
    const[reclamosList, setReclamosList] = useState([]);

    async function getReclamos() {
        let respuesta = await fetch("http://localhost:8081/api/reclamos/obtenerTodosLosReclamos");
        let reclamos = await respuesta.json();
        console.log(reclamos);
        setReclamosList(reclamos)
    }

    useEffect(
        () => {getReclamos()}, []
    )

    return(
        <div>
            <div>
                {
                    reclamosList.map( (r) => (
                        <div>
                            <div className="box-conteiner">
                                <div className="caja">{r}</div>
                                <div></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}