import React, { useState } from 'react';

export default function BorrarDuenio() {
    const [idUnidad, setIdUnidad] = useState('');
    const [documento, setDocumento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const eliminarDuenio = async (e) => {
        e.preventDefault();

        if (!idUnidad.trim() || !documento.trim()) {
            setMensaje('Por favor, complete todos los campos.');
            return;
        }

        try {
            const url = `http://localhost:8081/api/duenios/eliminarDuenio/${idUnidad}/${documento}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Dueño eliminado exitosamente');
                setIdUnidad('');
                setDocumento('');
            } else {
                setMensaje('Error al eliminar el dueño. Verifique los datos ingresados.');
            }
        } catch (error) {
            setMensaje('Error de conexión.');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={eliminarDuenio}>
                <div>
                    <label>ID Unidad:</label>
                    <input
                        type="text"
                        value={idUnidad}
                        onChange={(e) => setIdUnidad(e.target.value)}
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
                <button type="submit">Eliminar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
