import React, { useState } from 'react';

export default function BorrarReclamo() {
    const [idReclamo, setIdReclamo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const eliminarReclamo = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/reclamos/eliminarReclamo/${idReclamo}`;
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMensaje('Reclamo eliminado exitosamente.');
                setIdReclamo('');
            } else {
                setMensaje('Error al eliminar el reclamo.');
            }
        } catch (error) {
            setMensaje('Error de conexión.');
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Eliminar Reclamo</h3>
            <form onSubmit={eliminarReclamo}>
                <div>
                    <label>ID del Reclamo:</label>
                    <input
                        type="text"
                        value={idReclamo}
                        onChange={(e) => setIdReclamo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Eliminar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
