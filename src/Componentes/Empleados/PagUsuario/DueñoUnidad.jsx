import React, { useState } from "react";

export default function BuscarDuenioUnidad() {
    const [idUnidad, setIdUnidad] = useState("");
    const [duenios, setDuenios] = useState([]); // Cambiado a array para manejar múltiples dueños
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!idUnidad.trim()) {
            setError("Por favor, ingrese un ID de unidad válido.");
            setDuenios([]); // Limpiar la lista de dueños previos
            return;
        }

        try {
            setError(""); // Limpiar errores previos
            const response = await fetch(
                `http://localhost:8081/api/unidades/dueniosPorUnidad/${idUnidad}`
            );

            const data = await response.json();
            console.log("Datos recibidos:", data); // Depuración

            if (!response.ok || !data.length) {
                throw new Error("No se encontraron dueños para esta unidad.");
            }

            setDuenios(data); // Guardar el array de dueños
        } catch (err) {
            setError(err.message); // Mostrar el mensaje de error
            setDuenios([]); // Limpiar datos previos
        }
    };

    return (
        <div>
            <p className="subtitulos">Dueños por unidad</p>
            <div className="divInputFunciones">
                <div className="divFunciones">ID Unidad:</div>
                <input
                    className="inputFunciones"
                    type="search"
                    placeholder="ID unidad"
                    value={idUnidad}
                    onChange={(e) => setIdUnidad(e.target.value)}
                />
            </div>
            <button className="botones" onClick={handleSearch}>
                Buscar
            </button>

            {error && <p>{error}</p>}

            {duenios.length > 0 ? (
                <ul>
                    {duenios.map((duenio, index) => (
                        <li key={index}>
                            Nombre: {duenio.nombre} - Documento: {duenio.documento}
                        </li>
                    ))}
                </ul>
            ) : (
                idUnidad.trim() && !error && <p>No se encontró información de dueños.</p>
            )}
        </div>
    );
}
