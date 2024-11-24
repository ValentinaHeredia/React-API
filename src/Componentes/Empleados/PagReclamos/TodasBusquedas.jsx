import React, { useState, useEffect } from "react";

export default function TodasBusquedas() {
    const [tipoBusqueda, setTipoBusqueda] = useState(""); // Controla el tipo de búsqueda seleccionada
    const [parametros, setParametros] = useState({}); // Almacena los parámetros de búsqueda
    const [reclamos, setReclamos] = useState([]); // Resultados
    const [error, setError] = useState(null); // Mensajes de error
    const [detallesVisibles, setDetallesVisibles] = useState({}); // Controla visibilidad de detalles

    // Actualiza los parámetros de búsqueda
    const handleChangeParametros = (key, value) => {
        setParametros((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        const realizarBusqueda = async () => {
            if (!tipoBusqueda) return; // No buscar si no se selecciona un tipo de búsqueda
            setError(null);
            setReclamos([]);
            try {
                let url = "";

                // Construye la URL de acuerdo con el tipo de búsqueda
                switch (tipoBusqueda) {
                    case "persona":
                        if (!parametros.documento) return;
                        url = `http://localhost:8081/api/reclamos/reclamosPorPersona/${parametros.documento}`;
                        break;
                    case "rangoFechas":
                        if (!parametros.fechaInicio || !parametros.fechaFin) return;
                        url = `http://localhost:8081/api/reclamos/obtenerReclamoConRangoFechas/${parametros.fechaInicio}/${parametros.fechaFin}`;
                        break;
                    case "areaComunPorEdificio":
                        if (!parametros.codigoEdificio) return;
                        url = `http://localhost:8081/api/reclamos/obtenerReclamosAreaComun/${parametros.codigoEdificio}`;
                        break;
                    case "idReclamo":
                        if (!parametros.idReclamo) return;
                        url = `http://localhost:8081/api/reclamos/buscarReclamo/${parametros.idReclamo}`;
                        break;
                    case "porEdificio":
                        if (!parametros.codigoEdificio) return;
                        url = `http://localhost:8081/api/reclamos/reclamosPorEdificio/${parametros.codigoEdificio}`;
                        break;
                    case "porUnidad":
                        if (!parametros.codigoUnidad) return;
                        url = `http://localhost:8081/api/reclamos/reclamosPorUnidad/${parametros.codigoUnidad}`;
                        break;
                    default:
                        return;
                }

                const response = await fetch(url);
                const data = await response.json();

                if (!response.ok || !data) {
                    throw new Error("No se encontraron resultados.");
                }

                setReclamos(Array.isArray(data) ? data : [data]); // Asegura que siempre sea un array
            } catch (err) {
                setError(err.message);
            }
        };

        // Agregar un debounce para evitar múltiples solicitudes rápidas
        const debounce = setTimeout(() => {
            realizarBusqueda();
        }, 500); // 500ms de retraso

        return () => clearTimeout(debounce);
    }, [tipoBusqueda, parametros]); // Ejecuta cada vez que cambie tipoBusqueda o parámetros

    const toggleDetalle = (id) => {
        setDetallesVisibles((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div>
            <div className="busquedas">
                <label htmlFor="tipoBusqueda" className="buscarLabel">Seleccione tipo de búsqueda:</label>
                <select className="selectReclamo"
                    id="tipoBusqueda"
                    value={tipoBusqueda}
                    onChange={(e) => {
                        setTipoBusqueda(e.target.value);
                        setParametros({});
                        setReclamos([]);
                        setError(null);
                    }}
                >
                    <option value="">Seleccionar...</option>
                    <option value="persona">Por Persona</option>
                    <option value="rangoFechas">Por Rango de Fechas</option>
                    <option value="areaComunPorEdificio">Área Común por Edificio</option>
                    <option value="idReclamo">Por ID Reclamo</option>
                    <option value="porEdificio">Por Edificio</option>
                    <option value="porUnidad">Por Unidad</option>
                </select>

                {/* Formulario dinámico */}
                {tipoBusqueda === "persona" && (
                    <div>
                        <input className="inputBusquedaReclamos"
                            type="text"
                            placeholder="Ingrese el Documento"
                            onChange={(e) => handleChangeParametros("documento", e.target.value)}
                        />
                    </div>
                )}
                {tipoBusqueda === "rangoFechas" && (
                    <div>
                        <input className="inputBusquedaReclamos"
                            type="text"
                            placeholder="Fecha Inicio (DD-MM-YY)"
                            onChange={(e) => handleChangeParametros("fechaInicio", e.target.value)}
                        />
                        <input className="inputBusquedaReclamos"
                            type="text"
                            placeholder="Fecha Fin (DD-MM-YY)"
                            onChange={(e) => handleChangeParametros("fechaFin", e.target.value)}
                        />
                    </div>
                )}
                {["areaComunPorEdificio", "porEdificio"].includes(tipoBusqueda) && (
                    <div>
                        <input className="inputBusquedaReclamos"
                            type="text"
                            placeholder="Código del Edificio"
                            onChange={(e) => handleChangeParametros("codigoEdificio", e.target.value)}
                        />
                    </div>
                )}
                {tipoBusqueda === "idReclamo" && (
                    <div>
                        <input className="inputBusquedaReclamos"
                            type="text"
                            placeholder="ID del Reclamo"
                            onChange={(e) => handleChangeParametros("idReclamo", e.target.value)}
                        />
                    </div>
                )}
                {tipoBusqueda === "porUnidad" && (
                    <div>
                        <input className="inputBusquedaReclamos"
                            type="text"
                            placeholder="Código de la Unidad"
                            onChange={(e) => handleChangeParametros("codigoUnidad", e.target.value)}
                        />
                    </div>
                )}

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            {/* Resultados */}
            {reclamos.length > 0 && (
                <div>
                    {reclamos.map((r) => (
                <div key={r.idReclamo} className="reclamoBox">
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
                                    <div>{r.codigo}</div>
                                </div>
                                <div className="divMuestraDatos">
                                    <h4>Documento: </h4>
                                    <div>{r.documento}</div>
                            </div>
                        </div>
                        <div className="datoPrimerasFila">
                            <div className="divMuestraDatos">
                                    <h4>Tipo de reclamo:</h4>
                                    <div>{r.tipoReclamo}</div>
                                </div>
                                <div className="divMuestraDatos">
                                    <h4>Fecha: </h4>
                                    <div>{r.fecha}</div>
                                </div>
                                <div className="divMuestraDatos">
                                    <h4>Unidad / Área común: </h4>
                                    <div>{r.identificador}</div>
                                </div>
                        </div>
                        <div className="datoPrimerasFila">
                            <div className="divMuestraDatos">
                                <h4>Ubicacion:</h4>
                                <div>{r.ubicacion}</div>
                            </div>
                            <div className="divMuestraDatos">
                                <h4>Descripción: </h4>
                                <div>{r.descripcion}</div>
                            </div>
                            <div className="divMuestraDatos">
                                <h4>Medidas Tomadas: </h4>
                                <div>{r.medidasTomadas || "Ninguna"}</div>
                            </div>
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
