import React, { useState } from 'react';

export default function BorrarUnidad() {
    const [id, setId] = useState('');
    const [mensaje, setMensaje] = useState('');

    const eliminarUnidad = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/unidades/eliminarUnidad/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMensaje('Unidad eliminada exitosamente');
                setId('');
            } else {
                setMensaje('Error al eliminar la unidad');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Eliminar Unidad</h1>
            <form onSubmit={eliminarUnidad}>
                <div>
                    <label>ID de la Unidad:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Eliminar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
