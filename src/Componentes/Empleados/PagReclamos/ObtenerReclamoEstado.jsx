import React, { useState, useEffect } from 'react';

export default function ObtenerReclamoEstado() {
    const [estado, setEstado] = useState('');
    const [reclamos, setReclamos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const handleCheckboxChange = (e) => {
        const value = e.target.value;

        if (estado === value) {
            setEstado('');
        } else {
            setEstado(value);
        }
    };

    useEffect(() => {
        const obtenerReclamos = async () => {
            if (estado === '') {
                setReclamos([]);
                setMensaje('Por favor selecciona un estado.');
                return;
            }

            try {
                const url = `http://localhost:8081/api/reclamos/obtenerReclamoConEstado/${estado}`;
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    setReclamos(data);
                    setMensaje('');
                } else {
                    setMensaje('No hay reclamos con ese estado');
                    setReclamos([]);
                }
            } catch (error) {
                setMensaje('Error de conexión.');
                console.error(error);
                setReclamos([]);
            }
        };

        obtenerReclamos();
    }, [estado]);

    return (
        <div>
            <p className='subtitulos'>Obtener Reclamos por Estado</p>

            <div className='DivEstados'>
                <label className='inputEstado'>
                    <input
                        type="checkbox"
                        value="Nuevo"
                        checked={estado === 'Nuevo'}
                        onChange={handleCheckboxChange}
                    />
                    Nuevo
                </label>
                <label className='inputEstado'>
                    <input
                        type="checkbox"
                        value="abierto"
                        checked={estado === 'abierto'}
                        onChange={handleCheckboxChange}
                    />
                    Abierto
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="enProceso"
                        checked={estado === 'enProceso'}
                        onChange={handleCheckboxChange}
                    />
                    En Proceso
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="desestimado"
                        checked={estado === 'desestimado'}
                        onChange={handleCheckboxChange}
                    />
                    Desestimado
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="anulado"
                        checked={estado === 'anulado'}
                        onChange={handleCheckboxChange}
                    />
                    Anulado
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="terminado"
                        checked={estado === 'terminado'}
                        onChange={handleCheckboxChange}
                    />
                    Terminado
                </label>
            </div>

            {mensaje && <p>{mensaje}</p>}

            {reclamos.length > 0 && (
                <div>
                    <h4>Reclamos con estado: {estado}</h4>
                    <ul>
                        {reclamos.map((reclamo) => (
                            <div key={reclamo.idReclamo}>
                                <div className='ResultadosEstados'>
                                    <div>ID Reclamo: {reclamo.idReclamo}</div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
