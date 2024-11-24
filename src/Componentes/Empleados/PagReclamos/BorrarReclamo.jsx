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
            <p className='subtitulos'>Eliminar Reclamo</p>
            <form onSubmit={eliminarReclamo}>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>ID Reclamo:</div>
                    <input className='inputFunciones'
                        type="text"
                        value={idReclamo}
                        onChange={(e) => setIdReclamo(e.target.value)}
                        required
                    />
                </div>
                <button className='botones' type="submit">Eliminar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
