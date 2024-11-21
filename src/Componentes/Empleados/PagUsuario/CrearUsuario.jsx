import React, { useState } from 'react';

export default function CrearUsuario() {
    const [documento, setDocumento] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [mensaje, setMensaje] = useState('');

    const agregarUsuario = async (e) => {
        e.preventDefault();

        try {
        const url = `http://localhost:8081/api/usuarios/agregarUsuario/${documento}/${contrasenia}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            setMensaje('Usuario agregado exitosamente');
            setDocumento('');
            setContrasenia('');
        } else {
            setMensaje('Error al agregar el usuario');
        }
        } catch (error) {
        setMensaje('Error de conexión');
        console.error(error);
        }
    };

    return (
        <div>
        <p>Agregar usuario</p>
        <form onSubmit={agregarUsuario}>
            <div>
            <label>Documento:</label>
            <input
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Contraseña:</label>
            <input
                type="password"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                required
            />
            </div>
            <button className='botones' type="submit">Agregar</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
