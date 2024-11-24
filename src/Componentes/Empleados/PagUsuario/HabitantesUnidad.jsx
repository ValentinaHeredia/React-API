import React, { useState } from "react";

export default function BuscarHabitantesUnidad() {
    const [unidadId, setUnidadId] = useState("");
    const [habitantes, setHabitantes] = useState([]);
    const [error, setError] = useState("");
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setUnidadId(value);

        if (debounceTimeout) clearTimeout(debounceTimeout);

        setDebounceTimeout(
            setTimeout(() => {
                buscarHabitantes(value.trim());
            }, 500)
        );
    };

    const buscarHabitantes = async (idUnidad) => {
        if (!idUnidad) {
            setError("Por favor, ingrese un ID de unidad válido.");
            setHabitantes([]);
            return;
        }

        try {
            setError("");
            const response = await fetch(
                `http://localhost:8081/api/unidades/habitantesPorUnidad/${idUnidad}`
            );

            if (!response.ok) {
                throw new Error("No se encontraron habitantes para esta unidad.");
            }

            const data = await response.json();
            setHabitantes(data);
        } catch (err) {
            setError(err.message);
            setHabitantes([]);
        }
    };

    return (
        <div>
            <p className="subtitulos">Habitantes por unidad</p>
            <div className="divInputFunciones">
                <div className="divFunciones">ID Unidad:</div>
                <input
                    className="inputFunciones"
                    type="search"
                    placeholder=""
                    value={unidadId}
                    onChange={handleInputChange}
                />
            </div>
            {error && <p>{error}</p>}
            {habitantes.length > 0 && (
                <div>
                    <ul>
                        {habitantes.map((habitante) => (
                            <div key={habitante.id}>
                                <div>{habitante.nombre}</div>
                                <div>{habitante.documento}</div>
                                <hr />
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
