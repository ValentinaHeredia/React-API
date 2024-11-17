import React, { useState } from 'react';

export default function TransferirUnidad() {
    const [id, setId] = useState('');
    const [documentoActual, setDocumentoActual] = useState('');
    const [documentoNuevo, setDocumentoNuevo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleTransferir = async (e) => {
        e.preventDefault();

        if (!id || !documentoActual || !documentoNuevo) {
        setMensaje('Todos los campos son obligatorios');
        return;
        }

        try {
        const url = `http://localhost:8081/api/unidades/transferirUnidad/${id}/${documentoActual}/${documentoNuevo}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            setMensaje('Unidad transferida exitosamente');
            setId('');
            setDocumentoActual('');
            setDocumentoNuevo('');
        } else {
            const errorText = await response.text();
            setMensaje(`Error: ${errorText}`);
        }
        } catch (error) {
        setMensaje('Error de conexión con el servidor');
        console.error(error);
        }
    };

    return (
        <div>
        <h1>Transferir Unidad</h1>
        <form onSubmit={handleTransferir}>
            <div>
            <label>ID de la unidad:</label>
            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Documento actual del dueño:</label>
            <input
                type="text"
                value={documentoActual}
                onChange={(e) => setDocumentoActual(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Documento nuevo del dueño:</label>
            <input
                type="text"
                value={documentoNuevo}
                onChange={(e) => setDocumentoNuevo(e.target.value)}
                required
            />
            </div>
            <button type="submit">Transferir</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
