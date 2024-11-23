import React, { useState, useEffect } from "react";

function BuscarUnidades() {
    const [opcion, setOpcion] = useState("unidad"); // "unidad" o "edificio"
    const [codigo, setCodigo] = useState("");
    const [resultado, setResultado] = useState(null); // Puede ser una unidad o una lista de unidades
    const [error, setError] = useState(null);
    const [detallesVisibles, setDetallesVisibles] = useState({});

    useEffect(() => {
        const buscar = async () => {
            if (codigo.trim() === "") {
                setResultado(null);
                setError(null);
                return;
            }

            const numericCode = parseInt(codigo, 10);
            if (isNaN(numericCode)) {
                setError("El código debe ser un número válido.");
                setResultado(null);
                return;
            }

            if (opcion === "unidad") {
                await buscarUnidad(numericCode);
            } else if (opcion === "edificio") {
                await buscarUnidadesPorEdificio(numericCode);
            }
        };

        // Delay para evitar que se haga la búsqueda en cada pulsación
        const delayDebounceFn = setTimeout(() => {
            buscar();
        }, 500); // 500 ms de retraso para evitar múltiples solicitudes rápidas

        return () => clearTimeout(delayDebounceFn); // Limpiar el timeout anterior si el usuario sigue escribiendo
    }, [codigo, opcion]); // Ejecutar efecto cuando `codigo` u `opcion` cambien

    const buscarUnidad = async (numericCode) => {
        try {
            const response = await fetch(`http://localhost:8081/api/unidades/obtenerUnidadPorCodigo/${numericCode}`);
            const data = await response.json();

            if (response.ok) {
                setResultado(data);
                setError(null);
            } else {
                setError("No existe esta unidad.");
                setResultado(null);
            }
        } catch (error) {
            setError("Error en la búsqueda.");
            setResultado(null);
        }
    };

    const buscarUnidadesPorEdificio = async (numericCode) => {
        try {
            const response = await fetch(`http://localhost:8081/api/unidades/unidadesPorEdificio/${numericCode}`);
            const data = await response.json();

            if (response.ok) {
                setResultado(data);
                setError(null);
            } else {
                setError("No existen unidades para este edificio.");
                setResultado(null);
            }
        } catch (error) {
            setError("Error en la búsqueda.");
            setResultado(null);
        }
    };

    const toggleDetalle = (id) => {
        setDetallesVisibles((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div>
            <label className="buscarLabel" htmlFor="opcion-select">Buscar por:</label>
            <select className="select" id="opcion-select" value={opcion} onChange={(e) => setOpcion(e.target.value)}>
                <option value="unidad">Unidad</option>
                <option value="edificio">Edificio</option>
            </select>

            <input className="inputFunciones"
                type="search"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder={opcion === "unidad" ? "ID unidad" : "Código edificio"}
            />

            {error && <p>{error}</p>}

            {/* Mostrar resultado para búsqueda de unidad */}
            {opcion === "unidad" && resultado && (
                <div className="color">
                    <div className="boxDatosUnidad">
                        <div className="boxDatoUnidad">ID: {resultado.identificador}</div>
                        <div className="boxDatoUnidad">Piso: {resultado.piso}</div>
                        <div className="boxDatoUnidad">Número: {resultado.numero}</div>
                        <div className="boxDatoUnidad">Código de Edificio: {resultado.codigoEdificio}</div>
                        <button onClick={() => toggleDetalle(resultado.identificador)} className="btnDetalle botonDetalle">
                            {detallesVisibles[resultado.identificador] ? "Ocultar Detalle" : "Mostrar Detalle"}
                        </button>
                    </div>
                    {detallesVisibles[resultado.identificador] && (
                    <div className="detalleExtra">
                        <div className="habitado">
                            <div className="habitado">Habitado: {resultado.habitado === "t" ? "Sí" : "No"}</div>
                        </div>
                        <div className="personas">
                            <div>
                                <h4>dueño/s</h4>
                                {resultado.duenios && resultado.duenios.length > 0 ? (
                                    resultado.duenios.map((duenio, index) => (
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
                            {resultado.inquilinos && resultado.inquilinos.length > 0 ? (
                                resultado.inquilinos.map((inquilino, index) => (
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
                                {resultado.habitantes && resultado.habitantes.length > 0 ? (
                                    resultado.habitantes.map((habitante, index) => (
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
            )}

            {/* Mostrar resultado para búsqueda de unidades por edificio */}
            {opcion === "edificio" && resultado && Array.isArray(resultado) && (
                <div>
                    <div>
                        {resultado.map((unidad) => (
                            <div key={unidad.identificador}>
                                <div className="boxDatosUnidad">
                                    <div className="boxDatoUnidad">ID: {unidad.identificador}</div>
                                    <div className="boxDatoUnidad">Piso: {unidad.piso}</div>
                                    <div className="boxDatoUnidad">Número: {unidad.numero}</div>
                                    <div className="boxDatoUnidad">Código de Edificio: {unidad.codigoEdificio}</div>
                                    <button onClick={() => toggleDetalle(unidad.identificador)} className="btnDetalle botonDetalle">
                                        {detallesVisibles[unidad.identificador] ? "Ocultar Detalle" : "Mostrar Detalle"}
                                    </button>
                                </div>
                                {detallesVisibles[unidad.identificador] && (
                                    <div className="detalleExtra">
                                        <div className="habitado">
                                            <div>Habitado: {unidad.habitado === "t" ? "Sí" : "No"}</div>
                                        </div>
                                        <div className="personas">
                                            <div>
                                                <h4>Dueño/s:</h4>
                                                {unidad.duenios && unidad.duenios.length > 0 ? (
                                                    unidad.duenios.map((duenio, index) => (
                                                        <div key={index}>
                                                            Documento: {duenio.documento} - Nombre: {duenio.nombre}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>Sin dueños registrados</div>
                                                )}
                                            </div>
                                            <div>
                                                <h4>Inquilinos:</h4>
                                                {unidad.inquilinos && unidad.inquilinos.length > 0 ? (
                                                    unidad.inquilinos.map((inquilino, index) => (
                                                        <div key={index}>
                                                            Documento: {inquilino.documento} - Nombre: {inquilino.nombre}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>Sin inquilinos registrados</div>
                                                )}
                                            </div>
                                            <div>
                                                <h4>Habitantes:</h4>
                                                {unidad.habitantes && unidad.habitantes.length > 0 ? (
                                                    unidad.habitantes.map((habitante, index) => (
                                                        <div key={index}>
                                                            Documento: {habitante.documento} - Nombre: {habitante.nombre}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>Sin habitantes registrados</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BuscarUnidades;
