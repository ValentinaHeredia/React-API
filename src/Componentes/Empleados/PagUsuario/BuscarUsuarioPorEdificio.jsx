import React, { useState, useEffect } from 'react';

export default function BuscarUsuarioPorEdificio() {
    const [codigoEdificio, setCodigoEdificio] = useState('');
    const [habitantes, setHabitantes] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [hasTyped, setHasTyped] = useState(false); // Nuevo estado para saber si el usuario comenzó a escribir

    useEffect(() => {
        // Mostrar mensaje solo si el usuario ha empezado a escribir y el campo está vacío
        if (codigoEdificio.trim() === '') {
            if (hasTyped) {
                setMensaje('Por favor, ingresa un código de edificio.');
            } else {
                setMensaje('');
            }
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
    }, [codigoEdificio, hasTyped]); // Ejecuta cuando cambia el código del edificio o el usuario empieza a escribir

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCodigoEdificio(value);

        // Marcar que el usuario ha empezado a escribir
        if (!hasTyped) {
            setHasTyped(true);
        }
    };

    return (
        <div>
            <p className='subtitulos'>Usuarios por Edificios</p>
            <div>
                <label htmlFor="codigoEdificio">Código de Edificio:</label>
                <input className='inputFunciones'
                    type="text"
                    id="codigoEdificio"
                    placeholder="Ingresa el código del edificio"
                    value={codigoEdificio}
                    onChange={handleInputChange}
                />
            </div>

            {/* Mostrar mensaje solo si el usuario ha empezado a escribir */}
            {mensaje && <p>{mensaje}</p>}

            {habitantes.length > 0 && (
                <div>
                    <h4>Habitantes del edificio con código: {codigoEdificio}</h4>
                    <ul>
                        {habitantes.map((habitante) => (
                            <div key={habitante.id}>
                                <div>
                                    <p>Nombre: {habitante.nombre}</p>
                                    <p>Apellido: {habitante.apellido}</p>
                                    <p>Documento: {habitante.documento}</p>
                                    <p>ID Unidad: {habitante.unidad}</p>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
