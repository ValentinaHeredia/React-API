import React, { useState } from "react";

function BuscarUnidades() {
    const [code, setCode] = useState(""); 
    const [unidad, setUnidad] = useState(null); 
    const [error, setError] = useState(null);  

    const handleChange = async (event) => {
        const value = event.target.value;
        setCode(value);

        if (value.trim() === "") {
            setUnidad(null);
            setError(null);
            return;
        }

        const numericCode = parseInt(value, 10);
        if (isNaN(numericCode)) {
            setError("El código debe ser un número válido.");
            setUnidad(null);
            return;
        }

        await buscarUnidades(numericCode);
    };

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            const numericCode = parseInt(code, 10);

            if (isNaN(numericCode) || code.trim() === "") {
                setError("El código debe ser un número válido.");
                setUnidad(null);
                return;
            }

            await buscarUnidades(numericCode);
        }
    };

    const buscarUnidades = async (numericCode) => {
        try {
            const response = await fetch(`http://localhost:8081/api/unidades/obtenerUnidadPorCodigo/${numericCode}`);
            const data = await response.json();

            if (response.ok) {
                setUnidad(data);
                setError(null);
            } else {
                setError("No existe esta unidad.");
                setUnidad(null);
            }
        } catch (error) {
            setError("Error en la búsqueda.");
            setUnidad(null);
        }
    };

    return (
        <div>
            <label className="buscarLabel">Buscar</label>
            <input
                className="inputFunciones"
                type="search"
                value={code}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Ingresa el código de la unidad"
            />

            {error && <p>{error}</p>}

            {unidad && (
                <div className="color">
                    <div className="box-conteiner">
                        <div className="caja">{unidad.identificador}</div>
                        <div className="caja">Piso: {unidad.piso}</div>
                        <div className="caja">Número: {unidad.numero}</div>
                        <div className="caja">
                            Habitado: {unidad.habitado === "t" ? "Sí" : "No"}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BuscarUnidades;
