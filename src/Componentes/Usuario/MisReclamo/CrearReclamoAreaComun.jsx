import React, { useState } from "react";

export default function CrearReclamo() {
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
            <h3>Crear Reclamo de Área Común</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Documento del Usuario:</label>
                    <input
                        type="text"
                        value={documentoUsuario}
                        onChange={(e) => setDocumentoUsuario(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Código del Edificio:</label>
                    <input
                        type="text"
                        value={codigoEdificio}
                        onChange={(e) => setCodigoEdificio(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ubicación:</label>
                    <input
                        type="text"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Tipo de Reclamo:</label>
                    <select
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
                <button type="submit">Crear Reclamo</button>
            </form>

            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
