import React, { useState } from "react";

export default function CrearReclamoAreaComun() {
    const [documentoUsuario, setDocumentoUsuario] = useState("");
    const [codigoEdificio, setCodigoEdificio] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipoReclamo, setTipoReclamo] = useState("");
    const [mensaje, setMensaje] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const idUnidad = -1; // Valor predeterminado para áreas comunes
        const url = `http://localhost:8081/api/reclamos/crearReclamo/${documentoUsuario}/${codigoEdificio}/${idUnidad}/${ubicacion}/${descripcion}/${tipoReclamo}`;

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

    return (
        <div>
            <p className="subtitulos">Crear Reclamo de Área Común</p>
            <form onSubmit={handleSubmit}>
                <div className="divInputFunciones">
                    <div className="divFunciones">Documento del Usuario:</div>
                    <input className="inputFunciones"
                        type="text"
                        value={documentoUsuario}
                        onChange={(e) => setDocumentoUsuario(e.target.value)}
                        required
                    />
                </div>
                <div className="divInputFunciones">
                    <div className="divFunciones">Código del Edificio:</div>
                    <input className="inputFunciones"
                        type="text"
                        value={codigoEdificio}
                        onChange={(e) => setCodigoEdificio(e.target.value)}
                        required
                    />
                </div>
                <div className="divInputFunciones">
                    <div className="divFunciones">Ubicación:</div>
                    <input className="inputFunciones"
                        type="text"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <div className="divDescripcion">Descripción:</div>
                    <textarea className="inputDescripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="divInputFunciones">
                    <div className="divFunciones">Tipo de Reclamo:</div>
                    <select className="selectReclamo"
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
                <button className="botones" type="submit">Crear Reclamo</button>
            </form>

            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
