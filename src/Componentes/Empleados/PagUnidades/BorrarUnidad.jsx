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
            <p className='subtitulos'>Eliminar Unidad</p>
            <form onSubmit={eliminarUnidad}>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>ID Unidad:</div>
                    <input className='inputFunciones'
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
