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
            <h3>Obtener Reclamos por Estado</h3>

            <div>
                <label>
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
