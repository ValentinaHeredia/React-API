import React, { useState, useEffect } from "react";

export default function MostrarUnidades() {
    const [unidadesList, setUnidadesList] = useState([]);

    async function getUnidades() {
        try {
            const respuesta = await fetch("http://localhost:8081/api/unidades/obtenerTodasLasUnidades");
            const unidades = await respuesta.json();
            console.log(unidades);
            setUnidadesList(unidades);
        } catch (error) {
            console.error("Error al obtener las unidades:", error);
        }
    }

    useEffect(() => {
        getUnidades();
    }, []);

    return (
        <div>
            <h3>Listado de Unidades</h3>
            <div>
                {unidadesList.map((u) => (
                    <div key={u.identificador} className="color">
                        <div className="box-conteiner">
                            <div className="caja">ID: {u.identificador}</div>
                            <div className="caja">Piso: {u.piso}</div>
                            <div className="caja">Número: {u.numero}</div>
                            <div className="caja">Código de Edificio: {u.codigoEdificio}</div>
                            <div className="caja">Habitado: {u.habitado === "t" ? "Sí" : "No"}</div>
                        </div>
                        
                        <div>
                            <h4>Dueños:</h4>
                            {u.duenios && u.duenios.length > 0 ? (
                                u.duenios.map((duenio, index) => (
                                    <div key={index} className="caja">
                                        Documento: {duenio.documento} - Nombre: {duenio.nombre}
                                    </div>
                                ))
                            ) : (
                                <div className="caja">Sin dueños registrados</div>
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
                ))}
            </div>
        </div>
    );
}
