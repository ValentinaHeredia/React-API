import React, { useState } from "react";

function BuscarUnidadesEdificio() {
    const [codigoEdificio, setCodigoEdificio] = useState(''); 
    const [unidades, setUnidades] = useState([]); 
    const [error, setError] = useState(null);  

    const handleChange = async (event) => {
        const value = event.target.value;
        setCodigoEdificio(value);

        if (value.trim() === '') {
            setUnidades([]);
            setError(null);
            return;
        }

        const numericCode = parseInt(value, 10);
        if (isNaN(numericCode)) {
            setError('El código debe ser un número válido.');
            setUnidades([]);
            return;
        }

        await buscarUnidadesEdificio(numericCode);
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            const numericCode = parseInt(codigoEdificio, 10);

            if (isNaN(numericCode) || codigoEdificio.trim() === '') {
                setError('El código debe ser un número válido.');
                setUnidades([]);
                return;
            }

            await buscarUnidadesEdificio(numericCode);
        }
    };

    const buscarUnidadesEdificio = async (numericCode) => {
        try {
            const response = await fetch(`http://localhost:8081/api/unidades/unidadesPorEdificio/${numericCode}`);
            const data = await response.json();

            if (response.ok) {
                setUnidades(data);
                setError(null);
            } else {
                setError('No existen unidades para este edificio.');
                setUnidades([]);
            }
        } catch (error) {
            setError('Error en la búsqueda.');
            setUnidades([]);
        }
    };

    return (
        <div>
            <input
                type="search"
                value={codigoEdificio}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Ingresa el código del edificio"
            />

            {error && <p>{error}</p>}

            {unidades.length > 0 && (
                <div>
                    <h3>Unidades del edificio:</h3>
                    <div className="unidades-lista">
                        {unidades.map((unidad) => (
                            <div key={unidad.identificador} className="unidad-item">
                                <div className="box-conteiner">
                                    <div className="caja">ID: {unidad.identificador}</div>
                                    <div className="caja">Piso: {unidad.piso}</div>
                                    <div className="caja">Número: {unidad.numero}</div>
                                    <div className="caja">
                                        Habitado: {unidad.habitado === "t" ? "Sí" : "No"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BuscarUnidadesEdificio;
