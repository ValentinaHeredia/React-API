import React, { useState, useEffect } from "react";

export default function MostrarUnidades() {
    const [unidadesList, setUnidadesList] = useState([]);
    const [detallesVisibles, setDetallesVisibles] = useState({}); // Estado para controlar la visibilidad

    async function getUnidades() {
        try {
            const respuesta = await fetch("http://localhost:8081/api/unidades/obtenerTodasLasUnidades");
            const unidades = await respuesta.json();
            setUnidadesList(unidades);
        } catch (error) {
            console.error("Error al obtener las unidades:", error);
        }
    }

    useEffect(() => {
        getUnidades();
    }, []);

    const toggleDetalle = (id) => {
        setDetallesVisibles((prev) => ({
            ...prev,
            [id]: !prev[id], // Alterna la visibilidad del detalle correspondiente
        }));
    };

    return (
        <div>
            {unidadesList.map((u) => (
                <div key={u.identificador}>
                    <div>
                        <div className="boxDatosUnidad">
                            <div className="boxDatoUnidad">ID: {u.identificador}</div>
                            <div className="boxDatoUnidad">Piso: {u.piso}</div>
                            <div className="boxDatoUnidad">Número: {u.numero}</div>
                            <div className="boxDatoUnidad">Código de Edificio: {u.codigoEdificio}</div>

                            <button onClick={() => toggleDetalle(u.identificador)} className="btnDetalle botonDetalle">
                                {detallesVisibles[u.identificador] ? "Ocultar Detalle" : "Mostrar Detalle"}
                            </button>
                        </div>
                        {detallesVisibles[u.identificador] && (
                        <div className="detalleExtra">
                            <div className="habitado">
                                <div className="habitado">Habitado: {u.habitado === "t" ? "Sí" : "No"}</div>
                            </div>
                            <div className="personas">
                                <div>
                                    <h4>dueño/s</h4>
                                    {u.duenios && u.duenios.length > 0 ? (
                                        u.duenios.map((duenio, index) => (
                                            <div key={index} className="">
                                                Documento: {duenio.documento} - Nombre: {duenio.nombre}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="">Sin dueños registrados</div>
                                    )}
                                </div>
                                <div>
                                <h4>Inquilinos:</h4>
                                {u.inquilinos && u.inquilinos.length > 0 ? (
                                    u.inquilinos.map((inquilino, index) => (
                                        <div key={index} className="caja">
                                            Documento: {inquilino.documento} - Nombre: {inquilino.nombre}
                                        </div>
                                    ))
                                ) : (
                                    <div className="caja">Sin inquilinos registrados</div>
                                )}
                                </div>
                                
                                <div>
                                    <h4>Habitantes:</h4>
                                    {u.habitantes && u.habitantes.length > 0 ? (
                                        u.habitantes.map((habitante, index) => (
                                            <div key={index} className="caja">
                                                Documento: {habitante.documento} - Nombre: {habitante.nombre}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="caja">Sin habitantes registrados</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
