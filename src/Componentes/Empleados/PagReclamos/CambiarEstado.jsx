import React, { useState } from 'react';

export default function CambiarEstado() {
    const [idReclamo, setIdReclamo] = useState('');
    const [nuevoEstado, setNuevoEstado] = useState('');
    const [medidasTomadas, setMedidasTomadas] = useState('');
    const [mensaje, setMensaje] = useState('');

    const cambiarEstado = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8081/api/reclamos/cambiarEstadoReclamo/${idReclamo}/${nuevoEstado}/${medidasTomadas}`;
            const response = await fetch(url, {
                method: 'PUT',
            });

            if (response.ok) {
                setMensaje('Estado del reclamo cambiado exitosamente.');
                setIdReclamo('');
                setNuevoEstado('');
                setMedidasTomadas('');
            } else {
                setMensaje('Error al cambiar el estado del reclamo.');
            }
        } catch (error) {
            setMensaje('Error de conexión.');
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Cambiar Estado del Reclamo</h3>
            <form onSubmit={cambiarEstado}>
                <div>
                    <label>ID del Reclamo:</label>
                    <input
                        type="text"
                        value={idReclamo}
                        onChange={(e) => setIdReclamo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nuevo Estado:</label>
                    <select
                        value={nuevoEstado}
                        onChange={(e) => setNuevoEstado(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar</option>
                        <option value="abierto">Abierto</option>
                        <option value="enProceso">En Proceso</option>
                        <option value="desestimado">Desestimado</option>
                        <option value="anulado">Anulado</option>
                        <option value="terminado">Terminado</option>
                    </select>
                </div>
                <div>
                    <label>Medidas Tomadas:</label>
                    <textarea
                        value={medidasTomadas}
                        onChange={(e) => setMedidasTomadas(e.target.value)}
                        placeholder="Describe las medidas tomadas..."
                        required
                    ></textarea>
                </div>
                <button type="submit">Cambiar Estado</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}