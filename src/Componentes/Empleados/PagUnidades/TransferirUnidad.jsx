import React, { useState } from 'react';

export default function TransferirUnidad() {
    const [idUnidad, setIdUnidad] = useState('');
    const [documento, setDocumento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const transferirUnidad = async (e) => {
        e.preventDefault();

        if (!idUnidad || !documento) {
            setMensaje('Por favor, completa todos los campos.');
            return;
        }

        try {
            const url = `http://localhost:8081/api/unidades/transferirUnidad/${idUnidad}/${documento}`;
            const response = await fetch(url, {
                method: 'POST',
            });

            if (response.ok) {
                setMensaje('Unidad transferida exitosamente.');
                setIdUnidad('');
                setDocumento('');
            } else {
                setMensaje('Error al transferir la unidad. Verifica los datos ingresados.');
            }
        } catch (error) {
            setMensaje('Error de conexión.');
            console.error(error);
        }
    };

    return (
        <div>
            <p className='subtitulos'>Transferir Unidad</p>
            <form onSubmit={transferirUnidad}>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>ID Unidad:</div>
                    <input className='inputFunciones'
                        type="text"
                        id="idUnidad"
                        placeholder=""
                        value={idUnidad}
                        onChange={(e) => setIdUnidad(e.target.value)}
                        required
                    />
                </div>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>Nuevo Dueño:</div>
                    <input className='inputFunciones'
                        type="text"
                        id="documento"
                        placeholder=""
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />
                </div>
                <button className='botones' type="submit">Transferir Unidad</button>
            </form>

            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
