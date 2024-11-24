import React, { useState, useEffect } from "react";

let debounceTimeout;

function BuscarDueniosEdificio() {
    const [codigo, setCodigo] = useState('');
    const [duenios, setDuenios] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const value = event.target.value;
        setCodigo(value);

        // Limpiar cualquier timeout previo para evitar múltiples solicitudes
        clearTimeout(debounceTimeout);

        // Agregar un pequeño retraso antes de realizar la búsqueda
        debounceTimeout = setTimeout(() => {
            buscarDuenios(value.trim());
        }, 500); // 500 ms de retraso
    };

    const buscarDuenios = async (codigo) => {
        if (!codigo) {
            setError(null); // Limpiar errores cuando no hay código
            setDuenios([]);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/duenios/dueniosPorEdificio/${codigo}`);
            const data = await response.json();

            if (response.ok) {
                setDuenios(data);
                setError(null);
            } else {
                setError("No se encontraron dueños para este edificio.");
                setDuenios([]);
            }
        } catch (error) {
            setError("Error en la búsqueda.");
            setDuenios([]);
        }
    };

    return (
        <div>
            <p className='subtitulos'>Dueños por edificio</p>
            <div className='divInputFunciones'>
                <div className='divFunciones'>Código:</div>
                <input className='inputFunciones'
                    type="search"
                    value={codigo}
                    onChange={handleChange}
                    placeholder="Ingresa el código del edificio"
                />
            </div>

            {error && <p>{error}</p>}
            {duenios.length > 0 && (
                <ul>
                    {duenios.map((duenio) => (
                        <li key={duenio.documento}>
                            {duenio.nombre} - Documento: {duenio.documento}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BuscarDueniosEdificio;
