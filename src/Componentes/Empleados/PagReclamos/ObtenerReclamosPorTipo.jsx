import React, { useState, useEffect } from 'react';

export default function ObtenerReclamosPorTipoCheckbox() {
    const [tipoReclamo, setTipoReclamo] = useState('');
    const [reclamos, setReclamos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const tiposDeReclamo = [
        "plomeria",
        "electricidad",
        "pintura",
        "mantenimiento_de_ascensores",
        "limpieza",
        "seguridad",
        "mantenimiento_de_bombas",
    ];

    const handleCheckboxChange = (selectedTipo) => {
        if (tipoReclamo === selectedTipo) {
            setTipoReclamo(''); // Deselecciona si el mismo está seleccionado
        } else {
            setTipoReclamo(selectedTipo); // Selecciona el nuevo
        }
    };

    useEffect(() => {
        if (tipoReclamo === '') {
            setReclamos([]);
            setMensaje('Por favor selecciona un tipo de reclamo.');
            return;
        }

        const obtenerReclamos = async () => {
            try {
                const url = `http://localhost:8081/api/reclamos/obtenerReclamoConTipoReclamo/${tipoReclamo}`;
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    setReclamos(data);
                    setMensaje('');
                } else {
                    setMensaje('No hay reclamos de ese tipo.');
                    setReclamos([]);
                }
            } catch (error) {
                setMensaje('Error de conexión.');
                console.error(error);
                setReclamos([]);
            }
        };

        obtenerReclamos();
    }, [tipoReclamo]); // Ejecuta cada vez que `tipoReclamo` cambia

    return (
        <div>
            <h3>Obtener Reclamos por Tipo (Checkbox en Tiempo Real)</h3>
            <div>
                <p>Selecciona un tipo de reclamo:</p>
                {tiposDeReclamo.map((tipo) => (
                    <div key={tipo}>
                        <label>
                            <input
                                type="checkbox"
                                checked={tipoReclamo === tipo}
                                onChange={() => handleCheckboxChange(tipo)}
                            />
                            {tipo.charAt(0).toUpperCase() + tipo.slice(1).replace(/_/g, ' ')}
                        </label>
                    </div>
                ))}
            </div>

            {mensaje && <p>{mensaje}</p>}

            {reclamos.length > 0 && (
                <div>
                    <h4>Reclamos con tipo: {tipoReclamo}</h4>
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
