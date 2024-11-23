import React, { useState, useEffect } from 'react';

export default function ObtenerReclamosPorRangoFechasTiempoReal() {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [reclamos, setReclamos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        // Validar que ambas fechas estén presentes antes de buscar
        if (!fechaInicio || !fechaFin) {
            setMensaje('Por favor, ingresa ambas fechas para el rango.');
            setReclamos([]);
            return;
        }

        const obtenerReclamos = async () => {
            try {
                const url = `http://localhost:8081/api/reclamos/obtenerReclamoConRangoFechas/${fechaInicio}/${fechaFin}`;
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        setReclamos(data);
                        setMensaje('');
                    } else {
                        setMensaje('No se encontraron reclamos en ese rango de fechas.');
                        setReclamos([]);
                    }
                } else {
                    setMensaje('Error al buscar reclamos. Verifica las fechas.');
                    setReclamos([]);
                }
            } catch (error) {
                setMensaje('Error de conexión.');
                console.error(error);
                setReclamos([]);
            }
        };

        obtenerReclamos();
    }, [fechaInicio, fechaFin]); // Ejecuta cada vez que fechaInicio o fechaFin cambien

    return (
        <div>
            <p className='subtitulos'>Obtener Reclamos por Rango de Fechas</p>
            <div className='divInputFunciones'>
                <div className='divFunciones' htmlFor="fechaInicio">Fecha Inicio:</div>
                <input className='inputFunciones'
                    type="text"
                    id="fechaInicio"
                    placeholder="Ej: 01-01-24"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
            </div>
            <div className='divInputFunciones'>
                <div className='divFunciones' htmlFor="fechaFin">Fecha Fin:</div>
                <input className='inputFunciones'
                    type="text"
                    id="fechaFin"
                    placeholder="Ej: 03-01-24"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                />
            </div>

            {mensaje && <p>{mensaje}</p>}

            {reclamos.length > 0 && (
                <div>
                    <h4>Reclamos entre {fechaInicio} y {fechaFin}:</h4>
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
