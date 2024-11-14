import React, { useState } from 'react';

export default function CrearUnidad() {
    const [piso, setPiso] = useState('');
    const [numero, setNumero] = useState('');
    const [codigoEdificio, setCodigoEdificio] = useState('');
    const [mensaje, setMensaje] = useState('');

    const agregarUnidad = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/unidades/agregarUnidad/${piso}/${numero}/${codigoEdificio}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Unidad agregada exitosamente');
                setPiso('');
                setNumero('');
                setCodigoEdificio('');
            } else {
                setMensaje('Error al agregar la unidad');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Agregar Unidad</h1>
            <form onSubmit={agregarUnidad}>
                <div>
                    <label>Piso:</label>
                    <input
                        type="text"
                        value={piso}
                        onChange={(e) => setPiso(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Número:</label>
                    <input
                        type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
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
                <button type="submit">Agregar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
