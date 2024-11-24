import React, { useState, useEffect } from "react";

function BuscarUnidades() {
    const [opcion, setOpcion] = useState(""); // Controla la opción seleccionada
    const [codigo, setCodigo] = useState("");
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState(null);
    const [detallesVisibles, setDetallesVisibles] = useState({});
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    useEffect(() => {
        if (codigo.trim() === "") {
            setResultado(null);
            setError(null);
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            const numericCode = parseInt(codigo, 10);
            if (isNaN(numericCode)) {
                setError("El código debe ser un número válido.");
                setResultado(null);
                return;
            }

            if (opcion === "unidad") {
                buscarUnidad(numericCode);
            } else if (opcion === "edificio") {
                buscarUnidadesPorEdificio(numericCode);
            }
        }, 500); // Retraso de 500ms para evitar múltiples solicitudes rápidas

        return () => clearTimeout(delayDebounceFn); // Limpiar timeout si el usuario sigue escribiendo
    }, [codigo, opcion]);

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
            <select
                className="select"
                id="opcion-select"
                value={opcion}
                onChange={(e) => setOpcion(e.target.value)}
            >
                <option value="">
                    Seleccionar...
                </option>
                <option value="unidad">Unidad</option>
                <option value="edificio">Edificio</option>
            </select>

            <input
                className="inputFunciones"
                type="search"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder={opcion === "unidad" ? "Código de la Unidad" : "Código del Edificio"}
                disabled={!opcion} // Deshabilitar si no se selecciona una opción
            />

            {error && <p>{error}</p>}

            {opcion === "unidad" && resultado && (
                <div className="color">
                    <div className="boxDatosUnidad">
                        <div className="boxDatoUnidad">ID: {resultado.identificador}</div>
                        <div className="boxDatoUnidad">Piso: {resultado.piso}</div>
                        <div className="boxDatoUnidad">Número: {resultado.numero}</div>
                        <div className="boxDatoUnidad">Código de Edificio: {resultado.codigoEdificio}</div>
                        <button
                            onClick={() => toggleDetalle(resultado.identificador)}
                            className="btnDetalle botonDetalle"
                        >
                            {detallesVisibles[resultado.identificador] ? "Ocultar Detalle" : "Mostrar Detalle"}
                        </button>
                    </div>
                    {detallesVisibles[resultado.identificador] && (
                        <div className="detalleExtra">
                            <div className="habitado">Habitado: {resultado.habitado === "t" ? "Sí" : "No"}</div>
                            <div className="personas">
                                <h4>Dueño/s:</h4>
                                {resultado.duenios && resultado.duenios.length > 0 ? (
                                    resultado.duenios.map((duenio, index) => (
                                        <div key={index}>
                                            Documento: {duenio.documento} - Nombre: {duenio.nombre}
                                        </div>
                                    ))
                                ) : (
                                    <div>Sin dueños registrados</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {opcion === "edificio" && resultado && Array.isArray(resultado) && (
                <div>
                    {resultado.map((unidad) => (
                        <div key={unidad.identificador}>
                            <div className="boxDatosUnidad">
                                <div className="boxDatoUnidad">ID: {unidad.identificador}</div>
                                <div className="boxDatoUnidad">Piso: {unidad.piso}</div>
                                <div className="boxDatoUnidad">Número: {unidad.numero}</div>
                                <div className="boxDatoUnidad">Código de Edificio: {unidad.codigoEdificio}</div>
                                <button
                                    onClick={() => toggleDetalle(unidad.identificador)}
                                    className="btnDetalle botonDetalle"
                                >
                                    {detallesVisibles[unidad.identificador] ? "Ocultar Detalle" : "Mostrar Detalle"}
                                </button>
                            </div>
                            {detallesVisibles[unidad.identificador] && (
                                <div className="detalleExtra">
                                    <div className="habitado">
                                        Habitado: {unidad.habitado === "t" ? "Sí" : "No"}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BuscarUnidades;
