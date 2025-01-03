import React, { useState } from 'react';

export default function BorrarHabitante() {
    const [documento, setDocumento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const eliminarHabitante = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/habitantes/eliminarHabitante/${documento}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Habitante eliminado exitosamente');
                setDocumento('');
            } else {
                setMensaje('Error al eliminar el habitante');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p className='subtitulos'>Eliminar habitante</p>
            <form onSubmit={eliminarHabitante}>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>Documento:</div>
                    <input className='inputFunciones'
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
