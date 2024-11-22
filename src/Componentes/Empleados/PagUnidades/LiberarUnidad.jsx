import React, { useState } from 'react';

export default function LiberarUnidad() {
    const [id, setId] = useState('');
    const [mensaje, setMensaje] = useState('');

    const liberarUnidad = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/unidades/liberarUnidad/${id}`;
            const response = await fetch(url, {
                method: 'PUT',  // Cambié a PUT según tu aclaración
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Unidad liberada exitosamente');
                setId('');
            } else {
                setMensaje('Error al liberar la unidad');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p className='subtitulos'>Liberar Unidad</p>
            <form onSubmit={liberarUnidad}>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>ID unidad</div>
                    <input className='inputFunciones'
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <button className='botones' type="submit">Liberar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
