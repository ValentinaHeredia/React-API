import React, { useState, useEffect } from 'react';

export default function BuscarUsuarioPorEdificio() {
    const [codigoEdificio, setCodigoEdificio] = useState('');
    const [habitantes, setHabitantes] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (codigoEdificio.trim() === '') {
            setMensaje('Por favor, ingresa un código de edificio.');
            setHabitantes([]);
            return;
        }

        const obtenerHabitantes = async () => {
            try {
                const url = `http://localhost:8081/api/edificios/obtenerHabitantesPorEdificio/${codigoEdificio}`;
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        setHabitantes(data);
                        setMensaje('');
                    } else {
                        setMensaje('No se encontraron habitantes para este edificio.');
                        setHabitantes([]);
                    }
                } else {
                    setMensaje('Código de edificio no válido.');
                    setHabitantes([]);
                }
            } catch (error) {
                setMensaje('Error de conexión.');
                console.error(error);
                setHabitantes([]);
            }
        };

        obtenerHabitantes();
    }, [codigoEdificio]); // Ejecuta cada vez que cambia el código del edificio

    return (
        <div>
            <div>
                <label htmlFor="codigoEdificio">Código de Edificio:</label>
                <input
                    type="text"
                    id="codigoEdificio"
                    placeholder="Ingresa el código del edificio"
                    value={codigoEdificio}
                    onChange={(e) => setCodigoEdificio(e.target.value)}
                />
            </div>

            {mensaje && <p>{mensaje}</p>}

            {habitantes.length > 0 && (
                <div>
                    <h4>Habitantes del edificio con código: {codigoEdificio}</h4>
                    <ul>
                        {habitantes.map((habitante) => (
                            <li key={habitante.id}>
                                <div>
                                    <p>Nombre: {habitante.nombre}</p>
                                    <p>Apellido: {habitante.apellido}</p>
                                    <p>Documento: {habitante.documento}</p>
                                    <p>Unidad: {habitante.unidad}</p>
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
