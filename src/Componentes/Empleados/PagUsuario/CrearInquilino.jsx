import React, { useState } from 'react';

export default function CrearInquilino() {
    const [id, setId] = useState('');
    const [documento, setDocumento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const agregarInquilino = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/inquilinos/agregarInquilino/${id}/${documento}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Inquilino agregado exitosamente');
                setId('');
                setDocumento('');
            } else {
                setMensaje('Error al agregar el inquilino');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p>Agregar Inquilino</p>
            <form onSubmit={agregarInquilino}>
                <div>
                    <label>ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
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
