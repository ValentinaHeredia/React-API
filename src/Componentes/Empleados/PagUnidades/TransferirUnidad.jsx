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
            <h3>Transferir Unidad</h3>
            <form onSubmit={transferirUnidad}>
                <div>
                    <label htmlFor="idUnidad">ID de la Unidad:</label>
                    <input
                        type="text"
                        id="idUnidad"
                        placeholder="Ingresa el ID de la unidad"
                        value={idUnidad}
                        onChange={(e) => setIdUnidad(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="documento">Documento del Nuevo Propietario:</label>
                    <input
                        type="text"
                        id="documento"
                        placeholder="Ingresa el documento del propietario"
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
