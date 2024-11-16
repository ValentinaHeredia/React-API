import React, { useState } from 'react';

export default function CrearPersona() {
    const [documento, setDocumento] = useState('');
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    const agregarPersona = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/personas/agregarPersona/${documento}/${nombre}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Persona agregada exitosamente');
                setDocumento('');
                setNombre('');
            } else {
                setMensaje('Error al agregar la persona');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p>Agregar persona</p>
            <form onSubmit={agregarPersona}>
                <div>
                    <label>Documento:</label>
                    <input
                        type="text"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Agregar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}