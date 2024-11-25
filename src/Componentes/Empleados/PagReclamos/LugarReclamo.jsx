import React, { useState } from "react";

export default function DatosLugarReclamo() {
    const [idReclamo, setIdReclamo] = useState("");
    const [datosLugar, setDatosLugar] = useState(null);
    const [error, setError] = useState("");
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setIdReclamo(value);

        if (debounceTimeout) clearTimeout(debounceTimeout);

        setDebounceTimeout(
            setTimeout(() => {
                buscarDatosLugar(value.trim());
            }, 500)
        );
    };

    const buscarDatosLugar = async (idReclamo) => {
        if (!idReclamo) {
            setError("Por favor, ingrese un ID de reclamo válido.");
            setDatosLugar(null);
            return;
        }

        try {
            setError("");
            const response = await fetch(
                `http://localhost:8081/api/reclamos/datosLugarReclamo/${idReclamo}`
            );

            if (!response.ok) {
                throw new Error("No se encontraron datos para este reclamo.");
            }

            const data = await response.text();
            const lines = data.split("\n");
            const parsedData = {};

            lines.forEach((line) => {
                const [key, value] = line.split(":").map((item) => item.trim());
                parsedData[key.toLowerCase()] = value; // Convertir a minúsculas para manejar claves de forma uniforme
            });

            setDatosLugar(parsedData);
        } catch (err) {
            setError(err.message);
            setDatosLugar(null);
        }
    };

    return (
        <div>
            <p className="subtitulos">Buscar Datos del Lugar de Reclamo</p>
            <div className="divInputFunciones">
                <div className="divFunciones">ID reclamo:</div>
                <input
                    className="inputFunciones"
                    type="text"
                    value={idReclamo}
                    onChange={handleInputChange}
                />
            </div>

            {error && <p>{error}</p>}
            {datosLugar && (
                <div>
                    <div>Edificio: {datosLugar.edificio}</div>
                    {datosLugar.piso && <div>Piso: {datosLugar.piso}</div>}
                    {datosLugar.unidad && <div>Unidad: {datosLugar.unidad}</div>}
                    {datosLugar.ubicación && <div>Ubicación: {datosLugar.ubicación}</div>}
                    <hr />
                </div>
            )}
        </div>
    );
}
