import React, { useState } from 'react';

export default function ModificarContraseniaE() {
    const [documento, setDocumento] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [mensaje, setMensaje] = useState('');

    const modificarContrasenia = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/empleados/modificarContrasenia/${documento}/${contrasenia}`;
            const response = await fetch(url, {
                method: 'PUT',  // Usamos PUT como en el backend
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Contraseña modificada exitosamente');
                setDocumento('');
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
        <div>
            <p className='subtitulos'>Modificar contraseña del empleado</p>
            <form onSubmit={modificarContrasenia}>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>Documento:</div>
                    <input className='inputFunciones'
                        type="text"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />
                </div>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>Nueva Clave:</div>
                    <input className='inputFunciones'
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
