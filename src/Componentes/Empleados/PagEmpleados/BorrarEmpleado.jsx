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
            <p className='subtitulos'>Eliminar empleado</p>
            <form onSubmit={eliminarEmpleado}>
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
