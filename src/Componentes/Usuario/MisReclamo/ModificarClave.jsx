import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext'; // Importa el contexto

export default function ModificarClave() {
    const { userDocument } = useAuth(); // Obtener el documento del contexto
    const [documento, setDocumento] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        // Rellenar automáticamente el campo de documento con el valor del contexto
        if (userDocument) {
            setDocumento(userDocument);
        }
    }, [userDocument]);

    const modificarContrasenia = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/usuarios/modificarContraseniaUsuario/${documento}/${contrasenia}`;
            const response = await fetch(url, {
                method: 'PUT', // Usamos PUT como en el backend
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Contraseña modificada exitosamente');
                setContrasenia('');
            } else {
                setMensaje('Error al modificar la contraseña');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div className='cajaFuncionesMR'>
            <p className='subtitulos'>Modificar contraseña</p>
            <form onSubmit={modificarContrasenia}>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>Documento:</div>
                    <input
                        className='inputFunciones'
                        type="text"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        readOnly // Hacer que este campo sea de solo lectura
                    />
                </div>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>Nueva Clave:</div>
                    <input
                        className='inputFunciones'
                        type="password"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        required
                    />
                </div>
                <button className='botones' type="submit">Modificar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
