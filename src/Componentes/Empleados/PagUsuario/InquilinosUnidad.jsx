import React, { useState } from "react";

function BuscarInquilinosPorUnidad() {
    const [idUnidad, setIdUnidad] = useState('');
    const [inquilinos, setInquilinos] = useState([]);
    const [error, setError] = useState(null);

    const buscarInquilinos = async (id) => {
        try {
        const response = await fetch(`http://localhost:8081/api/unidades/inquilinosPorUnidad/${id}`);
        const data = await response.json();

        if (response.ok) {
            setInquilinos(data);
            setError(null);
        } else {
            setError('No se encontraron inquilinos para esta unidad.');
            setInquilinos([]);
        }
        } catch (error) {
        setError('Error en la búsqueda.');
        setInquilinos([]);
        }
    };

    const handleChange = async (event) => {
        const value = event.target.value;
        setIdUnidad(value);

        if (value.trim() === '') {
        setInquilinos([]);
        setError(null);
        return;
        }

        const id = parseInt(value, 10);
        if (isNaN(id)) {
        setError('El ID debe ser un número válido.');
        setInquilinos([]);
        return;
        }

        await buscarInquilinos(id);
    };

    return (
        <div>
            <p className='subtitulos'>Inquilinos por unidad</p>
            <div className='divInputFunciones'>
                <div className='divFunciones'>ID Unidad:</div>
                <input className='inputFunciones'
                    type="search"
                    value={idUnidad}
                    onChange={handleChange}
                    placeholder="Ingresa el ID de la unidad"
                />
            </div>
        {error && <p>{error}</p>}
        {inquilinos.length > 0 && (
            <ul>
            {inquilinos.map((inquilino) => (
                <li key={inquilino.id}>
                {inquilino.nombre} (Documento: {inquilino.documento})
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}

export default BuscarInquilinosPorUnidad;
