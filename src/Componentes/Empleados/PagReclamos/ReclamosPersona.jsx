import React, { useState } from "react";

export default function ReclamosPorPersona() {
    const [searchTerm, setSearchTerm] = useState(""); // Documento ingresado
    const [reclamos, setReclamos] = useState([]); // Para almacenar los reclamos
    const [error, setError] = useState(""); // Para manejar errores

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setError("Por favor, ingrese un documento válido.");
            setReclamos([]);
            return;
        }

        try {
            setError(""); // Limpiar errores previos
            const response = await fetch(
                `http://localhost:8081/api/reclamos/reclamosPorPersona/${searchTerm}`
            );

            if (!response.ok) {
                throw new Error("No se encontraron reclamos para este documento.");
            }

            const data = await response.json();
            setReclamos(Array.isArray(data) ? data : [data]); // Maneja tanto un único reclamo como un array de reclamos
        } catch (err) {
            setError(err.message); // Mostrar mensaje de error
            setReclamos([]); // Limpiar datos previos
        }
    };

    return (
        <div>
            <h2>Buscar Reclamos por Persona</h2>
            <input
                type="search"
                placeholder="Ingrese el documento (ej: 31507343)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
            {error && <p>{error}</p>}
            {reclamos.length > 0 ? (
                <div>
                    {reclamos.map((reclamo) => (
                        <div key={reclamo.idReclamo} className="box-conteiner color">
                            <div className="caja">ID Reclamo: {reclamo.idReclamo}</div>
                            <div className="caja">Estado: {reclamo.estado}</div>
                            <div className="caja">Fecha: {reclamo.fecha}</div>
                            <div className="caja">Código: {reclamo.codigo}</div>
                            <div className="caja">Identificador: {reclamo.identificador}</div>
                            <div className="caja">Documento Persona: {reclamo.documento}</div>
                            <div className="caja">Tipo Reclamo: {reclamo.tipoReclamo}</div>
                            <div className="caja">Descripción: {reclamo.descripcion}</div>
                        </div>
                    ))}
                </div>
            ) : (
                !error && <p>No hay reclamos disponibles para este documento.</p>
            )}
        </div>
    );
}
