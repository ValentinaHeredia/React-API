import React, { useState } from "react";

export default function ReclamoPorEdificio() {
    const [code, setCode] = useState(""); 
    const [reclamos, setReclamos] = useState([]); 
    const [error, setError] = useState(null);  

    const handleChange = async (event) => {
        const value = event.target.value;
        setCode(value);

        if (value.trim() === "") {
            setReclamos([]);
            setError(null);
            return;
        }

        const numericCode = parseInt(value, 10);
        if (isNaN(numericCode)) {
            setError("El código debe ser un número válido.");
            setReclamos([]);
            return;
        }

        await buscarReclamos(numericCode);
    };

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            const numericCode = parseInt(code, 10);

            if (isNaN(numericCode) || code.trim() === "") {
                setError("El código debe ser un número válido.");
                setReclamos([]);
                return;
            }

            await buscarReclamos(numericCode);
        }
    };

    const buscarReclamos = async (numericCode) => {
        try {
            const response = await fetch(`http://localhost:8081/api/reclamos/reclamosPorEdificio/${numericCode}`);
            const data = await response.json();

            if (response.ok) {
                setReclamos(data);
                setError(null);
            } else {
                setError("No existen reclamos para este edificio.");
                setReclamos([]);
            }
        } catch (error) {
            setError("Error en la búsqueda.");
            setReclamos([]);
        }
    };

    return (
        <div>
            <p className='subtitulos'>Buscar Reclamos por Edificio</p>
                <div className='divInputFunciones'>
                    <div className='divFunciones'>Id del Reclamo:</div>
                    <input className='inputFunciones'
                        type="search"
                        value={code}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Buscar reclamos por edificio"
                    />
                </div>

            {error && <p>{error}</p>}

            {reclamos.length > 0 ? (
                <div>
                    {reclamos.map((reclamo) => (
                        <div key={reclamo.idReclamo} className="color">
                            <div className="box-conteiner">
                                <div className="caja">{reclamo.idReclamo}</div>
                                <div className="caja">{reclamo.estado}</div>
                                <div className="caja">{reclamo.fecha}</div>
                            </div>
                            <div className="box-conteiner">
                                <div className="caja">Edificio: {reclamo.codigo}</div>
                                <div className="caja">Unidad / Área común: {reclamo.identificador}</div>
                                <div className="caja">Persona: {reclamo.documento}</div>
                                <div className="caja">Tipo: {reclamo.tipoReclamo}</div>
                            </div>
                            <div className="box-conteiner">
                                <div className="caja">Descripción: {reclamo.descripcion}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !error && <p>No hay reclamos disponibles.</p>
            )}
        </div>
    );
}
