import React, { useState } from "react";

export default function CrearReclamo() {
    const [tipoReclamoSeleccionado, setTipoReclamoSeleccionado] = useState(""); // "unidad" o "areaComun"
    const [documentoUsuario, setDocumentoUsuario] = useState("");
    const [codigoEdificio, setCodigoEdificio] = useState("");
    const [idUnidad, setIdUnidad] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipoReclamo, setTipoReclamo] = useState("");
    const [mensaje, setMensaje] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Configura valores específicos según el tipo de reclamo
        const isAreaComun = tipoReclamoSeleccionado === "areaComun";
        const url = `http://localhost:8081/api/reclamos/crearReclamo/${documentoUsuario}/${codigoEdificio}/${isAreaComun ? -1 : idUnidad}/${isAreaComun ? ubicacion : " "}/${descripcion}/${tipoReclamo}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setMensaje("Reclamo creado exitosamente.");
            } else {
                setMensaje("Error al crear el reclamo.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setMensaje("Ocurrió un error al intentar crear el reclamo.");
        }
    };

    const handleReset = () => {
        setTipoReclamoSeleccionado("");
        setDocumentoUsuario("");
        setCodigoEdificio("");
        setIdUnidad("");
        setUbicacion("");
        setDescripcion("");
        setTipoReclamo("");
        setMensaje(null);
    };

    return (
        <div>
            {mensaje ? (
                <div>
                    <p>{mensaje}</p>
                    <button className="botones" onClick={handleReset}>
                        Volver a opciones
                    </button>
                </div>
            ) : (
                <>
                    {!tipoReclamoSeleccionado ? (
                        <div>
                            <p className="subtitulos">Seleccione el tipo de reclamo</p>
                            <select
                                className="selectReclamo"
                                value={tipoReclamoSeleccionado}
                                onChange={(e) => setTipoReclamoSeleccionado(e.target.value)}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="unidad">Reclamo de Unidad</option>
                                <option value="areaComun">Reclamo de Área Común</option>
                            </select>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <p className="subtitulos">
                                {tipoReclamoSeleccionado === "unidad" ? "Crear Reclamo de Unidad" : "Crear Reclamo de Área Común"}
                            </p>
                            <div className="divInputFunciones">
                                <div className="divFunciones">Documento del Usuario:</div>
                                <input
                                    className="inputFunciones"
                                    type="text"
                                    value={documentoUsuario}
                                    onChange={(e) => setDocumentoUsuario(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="divInputFunciones">
                                <div className="divFunciones">Código del Edificio:</div>
                                <input
                                    className="inputFunciones"
                                    type="text"
                                    value={codigoEdificio}
                                    onChange={(e) => setCodigoEdificio(e.target.value)}
                                    required
                                />
                            </div>
                            {tipoReclamoSeleccionado === "unidad" ? (
                                <div className="divInputFunciones">
                                    <div className="divFunciones">ID de la Unidad:</div>
                                    <input
                                        className="inputFunciones"
                                        type="text"
                                        value={idUnidad}
                                        onChange={(e) => setIdUnidad(e.target.value)}
                                        required
                                    />
                                </div>
                            ) : (
                                <div className="divInputFunciones">
                                    <div className="divFunciones">Ubicación:</div>
                                    <input
                                        className="inputFunciones"
                                        type="text"
                                        value={ubicacion}
                                        onChange={(e) => setUbicacion(e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                            <div className="divTextDescripcion">
                                <div className="divDescripcion">Descripción:</div>
                                <textarea
                                    className="inputDescripcionCR"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="divInputFunciones">
                                <div className="divFunciones">Tipo de Reclamo:</div>
                                <select
                                    className="selectReclamo"
                                    value={tipoReclamo}
                                    onChange={(e) => setTipoReclamo(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione un tipo</option>
                                    <option value="plomeria">Plomería</option>
                                    <option value="electricidad">Electricidad</option>
                                    <option value="pintura">Pintura</option>
                                    <option value="mantenimiento_de_ascensores">Mantenimiento de Ascensores</option>
                                    <option value="limpieza">Limpieza</option>
                                    <option value="seguridad">Seguridad</option>
                                    <option value="mantenimiento_de_bombas">Mantenimiento de Bombas</option>
                                </select>
                            </div>
                            <button className="botones" type="submit">
                                Crear Reclamo
                            </button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
}
