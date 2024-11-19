import React, { useState, useEffect } from 'react';

export default function ObtenerReclamosPorRangoFechas() {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [reclamos, setReclamos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const obtenerReclamos = async () => {
        if (!fechaInicio || !fechaFin) {
            setMensaje('Por favor, selecciona ambas fechas para el rango.');
            return;
        }

        try {
            const url = `http://localhost:8081/api/reclamos/obtenerReclamoConRangoFechas/${fechaInicio}/${fechaFin}`;
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setReclamos(data);
                setMensaje('');
            } else {
                setMensaje('No se encontraron reclamos en ese rango de fechas.');
                setReclamos([]);
            }
        } catch (error) {
            setMensaje('Error de conexión.');
            console.error(error);
            setReclamos([]);
        }
    };

    return (
        <div>
            <h3>Obtener Reclamos por Rango de Fechas</h3>
            <div>
                <label htmlFor="fechaInicio">Fecha Inicio:</label>
                <input
                    type="date"
                    id="fechaInicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="fechaFin">Fecha Fin:</label>
                <input
                    type="date"
                    id="fechaFin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                />
            </div>
            <button onClick={obtenerReclamos}>Obtener Reclamos</button>

            {mensaje && <p>{mensaje}</p>}

            {reclamos.length > 0 && (
                <div>
                    <h4>Reclamos entre {fechaInicio} y {fechaFin}</h4>
                    <ul>
                        {reclamos.map((reclamo) => (
                            <li key={reclamo.idReclamo}>
                                <div>
                                    <p>ID Reclamo: {reclamo.idReclamo}</p>
                                    <p>Descripción: {reclamo.descripcion}</p>
                                    <p>Estado: {reclamo.estado}</p>
                                    <p>Medidas Tomadas: {reclamo.medidasTomadas || 'Ninguna'}</p>
                                    <p>Creado por: {reclamo.documentoUsuario}</p>
                                </div>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
