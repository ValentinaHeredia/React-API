import React, { useState, useEffect } from "react";

export default function MostrarReclamos() {
    const [reclamosList, setReclamosList] = useState([]);
    const [detallesVisibles, setDetallesVisibles] = useState({}); // Controla la visibilidad de los detalles

    async function getReclamos() {
        try {
            const respuesta = await fetch("http://localhost:8081/api/reclamos/todosLosReclamos");
            const reclamos = await respuesta.json();
            setReclamosList(reclamos);
        } catch (error) {
            console.error("Error al obtener los reclamos:", error);
        }
    }

    useEffect(() => {
        getReclamos();
    }, []);

    const toggleDetalle = (id) => {
        setDetallesVisibles((prev) => ({
            ...prev,
            [id]: !prev[id], // Alterna la visibilidad del detalle correspondiente
        }));
    };

    return (
        <div>
            {reclamosList.map((r) => (
                <div key={r.idReclamo}  className="centrarUnidad">
                    <div className="boxDatosUnidad">
                        <div className="boxDatoUnidad">Reclamo {r.idReclamo}</div>
                        <div className="boxDatoUnidad">Estado: {r.estado}</div>
                        <button onClick={() => toggleDetalle(r.idReclamo)} className="botonDetalle">
                            {detallesVisibles[r.idReclamo] ? "Ocultar Detalle" : "Mostrar Detalle"}
                        </button>
                    </div>
                    {detallesVisibles[r.idReclamo] && (
                        <div className="boxDatosExtrasReclamo">
                            <div className="datoPrimerasFila">
                                <div className="divMuestraDatos">
                                        <h4>Edificio:</h4>
                                        <div className="tamaño">{r.codigo}</div>
                                    </div>
                                    <div className="divMuestraDatos">
                                        <h4>Documento: </h4>
                                        <div className="tamaño">{r.documento}</div>
                                </div>
                            </div>
                            <div className="datoPrimerasFila">
                                <div className="divMuestraDatos">
                                        <h4>Tipo de reclamo:</h4>
                                        <div  className="tamaño">{r.tipoReclamo}</div>
                                    </div>
                                    <div className="divMuestraDatos">
                                        <h4>Fecha: </h4>
                                        <div  className="tamaño">{r.fecha}</div>
                                    </div>
                                    <div className="divMuestraDatos">
                                        <h4>Unidad / Área común: </h4>
                                        <div  className="tamaño">{r.identificador}</div>
                                    </div>
                            </div>
                            <div className="datoPrimerasFila">
                                <div className="divMuestraDatos">
                                    <h4>Ubicacion:</h4>
                                    <div  className="tamaño">{r.ubicacion}</div>
                                </div>
                                <div className="divMuestraDatos">
                                    <h4>Descripción: </h4>
                                    <div  className="tamaño">{r.descripcion}</div>
                                </div>
                                <div className="divMuestraDatos">
                                    <h4>Medidas Tomadas: </h4>
                                    <div className="tamaño">{r.medidasTomadas || "Ninguna"}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
