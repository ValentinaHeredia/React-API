import React, { useState } from "react";

function BuscarDueniosEdificio() {
    const [codigo, setCodigo] = useState('');
    const [duenios, setDuenios] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setCodigo(event.target.value);
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            await buscarDuenios(codigo.trim());
        }
    };

    const buscarDuenios = async (codigo) => {
        if (!codigo) {
            setError("El código del edificio no puede estar vacío.");
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
                <div className='divFunciones'>Codigo:</div>
                <input className='inputFunciones'
                    type="search"
                    value={codigo}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
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
