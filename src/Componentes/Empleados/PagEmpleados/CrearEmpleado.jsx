import React, { useState } from 'react';

export default function CrearEmpleado() {
    const [documento, setDocumento] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [mensaje, setMensaje] = useState('');

    const agregarEmpleado = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/empleados/crearEmpleado/${documento}/${contrasenia}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Empleado agregado exitosamente');
                setDocumento('');
                setContrasenia('');
            } else {
                setMensaje('Error al agregar el empleado');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p>Agregar empleado</p>
            <form onSubmit={agregarEmpleado}>
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
                <button type="submit">Agregar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
