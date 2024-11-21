import React, { useState } from 'react';

export default function BorrarPersonas() {
    const [documento, setDocumento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const eliminarPersona = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/personas/eliminarPersona/${documento}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Persona eliminada exitosamente');
                setDocumento('');
            } else {
                setMensaje('Error al eliminar la persona');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p>Eliminar persona</p>
            <form onSubmit={eliminarPersona}>
                <div>
                    <label>Documento:</label>
                    <input
                        type="text"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />
                </div>
                <button className='botones' type="submit">Eliminar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
