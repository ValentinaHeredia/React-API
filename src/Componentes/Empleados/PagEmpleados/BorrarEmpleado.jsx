import React, { useState } from 'react';

export default function BorrarEmpleado() {
    const [documento, setDocumento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const eliminarEmpleado = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/empleados/eliminarEmpleado/${documento}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensaje('Empleado eliminado exitosamente');
                setDocumento('');
            } else {
                setMensaje('Error al eliminar el empleado');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p>Eliminar empleado</p>
            <form onSubmit={eliminarEmpleado}>
                <div>
                    <label>Documento:</label>
                    <input
                        type="text"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Eliminar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}