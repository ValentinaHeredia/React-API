import React, { useState } from "react";

export default function BuscarHabitantesUnidad() {
    const [unidadId, setUnidadId] = useState("");
    const [habitantes, setHabitantes] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!unidadId.trim()) {
            setError("Por favor, ingrese un ID de unidad válido.");
            setHabitantes([]);
            return;
        }

        try {
            setError(""); // Limpiar errores previos
            const response = await fetch(
                `http://localhost:8081/api/unidades/habitantesPorUnidad/${unidadId}`
            );

            if (!response.ok) {
                throw new Error("No se encontraron habitantes para esta unidad.");
            }

            const data = await response.json();
            setHabitantes(data); // Guardar los datos obtenidos
        } catch (err) {
            setError(err.message); // Mostrar el mensaje de error
            setHabitantes([]); // Limpiar datos previos
        }
    };

    return (
        <div>
            <p className='subtitulos'>Habitantes por unidad</p>
            <div className='divInputFunciones'>
                <div className='divFunciones'>ID Unidad:</div>
                <input className='inputFunciones'
                    type="search"
                    placeholder="Ingrese el ID de la unidad (ej: 101)"
                    value={unidadId}
                    onChange={(e) => setUnidadId(e.target.value)}
                />
            </div>
            <button className="botones" onClick={handleSearch}>Buscar</button>
            {error && <p>{error}</p>}
            {habitantes.length > 0 && (
                <div>
                    <h3>Habitantes encontrados:</h3>
                    <ul>
                        {habitantes.map((habitante) => (
                            <li key={habitante.id}>
                                {habitante.nombre} (Documento: {habitante.documento})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
