import React, { useState } from "react";

export default function DatosLugarReclamo() {
    const [idReclamo, setIdReclamo] = useState(""); // Para almacenar el ID del reclamo
    const [datosLugar, setDatosLugar] = useState(null); // Para almacenar los datos del lugar
    const [error, setError] = useState(""); // Para manejar errores

    const handleSearch = async () => {
        if (!idReclamo.trim()) {
            setError("Por favor, ingrese un ID de reclamo válido.");
            setDatosLugar(null);
            return;
        }

        try {
            setError(""); // Limpiar errores previos
            const response = await fetch(
                `http://localhost:8081/api/reclamos/datosLugarReclamo/${idReclamo}`
            );

            // Verificar si la respuesta es válida
            if (!response.ok) {
                throw new Error("No se encontraron datos para este reclamo.");
            }

            // Leer la respuesta como texto
            const data = await response.text();

            // Asumir que la respuesta es un string con los datos
            const [edificio, ubicacion] = data.split("\n");  // Suponiendo que los datos están en líneas separadas
            const parsedData = {
                edificio: edificio.split(":")[1].trim(),
                ubicacion: ubicacion.split(":")[1].trim(),
            };

            setDatosLugar(parsedData); // Guardar los datos procesados
        } catch (err) {
            setError(err.message); // Mostrar el mensaje de error
            setDatosLugar(null); // Limpiar datos previos
        }
    };

    return (
        <div>
            <p className='subtitulos'>Buscar Datos del Lugar de Reclamo</p>
                <div className='divInputFunciones'>
                    <div className="divFunciones">ID reclamo</div>
                    <input className='inputFunciones'
                        type="text"
                        placeholder=""
                        value={idReclamo}
                        onChange={(e) => setIdReclamo(e.target.value)}
                    />
                </div>
            <button className="botones" onClick={handleSearch}>Buscar</button>

            {error && <p>{error}</p>}

            {datosLugar && (
                <div className="boxDatos">
                    <div className="boxDato">Edificio: {datosLugar.edificio}</div>
                    <div className="boxDato">Ubicación: {datosLugar.ubicacion}</div>
                </div>
            )}
        </div>
    );
}
