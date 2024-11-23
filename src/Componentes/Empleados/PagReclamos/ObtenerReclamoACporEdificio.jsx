import React, { useState, useEffect } from 'react';

export default function ObtenerReclamoACporEdificio() {
    const [codigoEdificio, setCodigoEdificio] = useState('');
    const [reclamos, setReclamos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        // Si el código de edificio está vacío, limpiamos los resultados
        if (codigoEdificio === '') {
            setReclamos([]);
            setMensaje('Por favor ingresa un código de edificio.');
            return;
        }

        const obtenerReclamos = async () => {
            try {
                const url = `http://localhost:8081/api/reclamos/obtenerReclamosAreaComun/${codigoEdificio}`;
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        setReclamos(data);
                        setMensaje('');
                    } else {
                        setMensaje('No se encontraron reclamos para este edificio.');
                        setReclamos([]);
                    }
                } else {
                    setMensaje('Error al obtener los reclamos.');
                    setReclamos([]);
                }
            } catch (error) {
                setMensaje('Error de conexión.');
                console.error(error);
                setReclamos([]);
            }
        };

        obtenerReclamos();
    }, [codigoEdificio]); // Ejecuta cada vez que `codigoEdificio` cambia

    return (
        <div>
            <p className='subtitulos'>Obtener Reclamos de Área Común por Edificio</p>
            <div className='divInputFunciones'>
                <div className='divFunciones'>Código del Edificio:</div>
                <input className='inputFunciones'
                    type="text"
                    id="codigoEdificio"
                    placeholder="Ej: 101"
                    value={codigoEdificio}
                    onChange={(e) => setCodigoEdificio(e.target.value)}
                />
            </div>

            {mensaje && <p>{mensaje}</p>}

            {reclamos.length > 0 && (
                <div>
                    <h4>Reclamos del Edificio {codigoEdificio}:</h4>
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
