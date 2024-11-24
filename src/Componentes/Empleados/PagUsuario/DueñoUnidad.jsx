import React, { useState } from "react";

export default function BuscarDuenioUnidad() {
    const [idUnidad, setIdUnidad] = useState("");
    const [duenios, setDuenios] = useState([]);
    const [error, setError] = useState("");
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setIdUnidad(value);

        if (debounceTimeout) clearTimeout(debounceTimeout);

        setDebounceTimeout(
            setTimeout(() => {
                buscarDuenios(value.trim());
            }, 500)
        );
    };

    const buscarDuenios = async (idUnidad) => {
        if (!idUnidad) {
            setError("Por favor, ingrese un ID de unidad válido.");
            setDuenios([]);
            return;
        }

        try {
            setError("");
            const response = await fetch(
                `http://localhost:8081/api/unidades/dueniosPorUnidad/${idUnidad}`
            );

            const data = await response.json();

            if (!response.ok || !data.length) {
                throw new Error("No se encontraron dueños para esta unidad.");
            }

            setDuenios(data);
        } catch (err) {
            setError(err.message);
            setDuenios([]);
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
                    placeholder=""
                    value={idUnidad}
                    onChange={handleInputChange}
                />
            </div>

            {error && <p>{error}</p>}

            {duenios.length > 0 ? (
                <ul>
                    {duenios.map((duenio, index) => (
                        <div key={index}>
                            <div>Nombre: {duenio.nombre}</div>
                            <div>Documento: {duenio.documento}</div>
                            <hr />
                        </div>
                    ))}
                </ul>
            ) : (
                idUnidad.trim() && !error && <p>No se encontró información de dueños.</p>
            )}
        </div>
    );
}
