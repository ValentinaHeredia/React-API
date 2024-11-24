import React, { useState } from 'react';

export default function BorrarInquilino() {
    const [idUnidad, setIdUnidad] = useState('');
    const [documento, setDocumento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const eliminarInquilino = async (e) => {
        e.preventDefault();

        if (!idUnidad.trim() || !documento.trim()) {
            setMensaje('Por favor, ingrese un ID de unidad y documento válidos.');
            return;
        }

        try {
            const url = `http://localhost:8081/api/inquilinos/eliminarInquilino/${idUnidad}/${documento}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Inquilino eliminado exitosamente');
                setIdUnidad('');
                setDocumento('');
            } else {
                setMensaje('Error al eliminar el inquilino');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p className='subtitulos'>Eliminar inquilino</p>
            <form onSubmit={eliminarInquilino}>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>ID Unidad:</div>
                    <input className='inputFunciones'
                        type="text"
                        value={idUnidad}
                        onChange={(e) => setIdUnidad(e.target.value)}
                        required
                    />
                </div>
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
