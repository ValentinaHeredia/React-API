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
                                <div className="boxDatos">
                                    <div className="boxDato">{r.idReclamo}</div>
                                    <div className="boxDato">{r.estado}</div>
                                    <div className="boxDato">{r.fecha}</div>
                                </div>
                                <div className="boxDatos">
                                    <div className="boxDato">Edificio: {r.codigo}</div>
                                    <div className="boxDato">Unidad / Area comun: {r.identificador}</div>
                                    <div className="boxDato">Persona: {r.documento}</div>
                                    <div className="boxDato">tipo: {r.tipoReclamo}</div>
                                </div>
                                <div className="boxDatos">
                                    <div className="boxDato">Lugar: {r.ubicacion}</div>
                                    <div className="boxDato">Descripcion: {r.descripcion}</div>
                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}