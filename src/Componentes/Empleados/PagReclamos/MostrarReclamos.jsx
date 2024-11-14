import React, {useState, useEffect} from "react";

export default function MostrarReclamos(){
    const[reclamosList, setReclamosList] = useState([]);

    async function getReclamos() {
        let respuesta = await fetch("http://localhost:8081/api/reclamos/todosLosReclamos");
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
                        <div className="color">
                                <div className="box-conteiner">
                                    <div className="caja">{r.idReclamo}</div>
                                    <div className="caja">{r.estado}</div>
                                    <div className="caja">{r.fecha}</div>
                                </div>
                                <div className="box-conteiner">
                                    <div className="caja">Edificio: {r.codigo}</div>
                                    <div className="caja">Unidad / Area comun: {r.identificador}</div>
                                    <div className="caja">Persona: {r.documento}</div>
                                    <div className="caja">tipo: {r.tipoReclamo}</div>
                                </div>
                                <div className="box-conteiner">
                                    <div className="caja">Descripcion: {r.descripcion}</div>
                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}