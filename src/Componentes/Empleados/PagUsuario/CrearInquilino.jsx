import React, { useState } from 'react';

export default function CrearInquilino() {
    const [id, setId] = useState('');
    const [documento, setDocumento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const agregarInquilino = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/inquilinos/agregarInquilino/${id}/${documento}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Inquilino agregado exitosamente');
                setId('');
                setDocumento('');
            } else {
                setMensaje('Error al agregar el inquilino');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p className='subtitulos'>Agregar Inquilino</p>
            <form onSubmit={agregarInquilino}>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>ID Unidad:</div>
                    <input className='inputFunciones'
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
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
                <button className='botones' type="submit">Agregar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
