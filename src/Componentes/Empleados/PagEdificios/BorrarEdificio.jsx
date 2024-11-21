import React, { useState } from 'react';

export default function BorrarEdificio() {
    const [id, setId] = useState('');
    const [mensaje, setMensaje] = useState('');

    const eliminarEdificio = async (e) => {
    e.preventDefault();

        try {
            const url = `http://localhost:8081/api/edificios/eliminarEdificio/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
            });

        if (response.ok) {
            setMensaje('Edificio eliminado exitosamente');
            setId('');
        } else {
            setMensaje('Error al eliminar el edificio');
        }
        } catch (error) {
        setMensaje('Error de conexión');
        console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={eliminarEdificio}>
                <div>
                <label>ID del Edificio:</label>
                <input className="inputFunciones"
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                </div>
                <button className='botones' type="submit">Eliminar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

