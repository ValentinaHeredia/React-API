import React, { useState } from 'react';

export default function CrearDuenio() {
    const [codigo, setCodigo] = useState('');
    const [documento, setDocumento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const agregarDuenio = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/duenios/agregarDuenio/${codigo}/${documento}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Dueño agregado exitosamente');
                setCodigo('');
                setDocumento('');
            } else {
                setMensaje('Error al agregar el dueño');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p>Agregar Dueño</p>
            <form onSubmit={agregarDuenio}>
                <div>
                    <label>Código:</label>
                    <input
                        type="text"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Documento:</label>
                    <input
                        type="text"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Agregar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
