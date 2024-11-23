import React, { useState } from 'react';

export default function BorrarUsuario() {
    const [documento, setDocumento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const eliminarUsuario = async (e) => {
        e.preventDefault();

        try {
        const url = `http://localhost:8081/api/usuarios/eliminarUsuario/${documento}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            setMensaje('Usuario eliminado exitosamente');
            setDocumento('');
        } else {
            setMensaje('Error al eliminar el usuario');
        }
        } catch (error) {
        setMensaje('Error de conexión');
        console.error(error);
        }
    };

    return (
        <div>
        <p className='subtitulos'>Eliminar usuario</p>
        <form onSubmit={eliminarUsuario}>
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
