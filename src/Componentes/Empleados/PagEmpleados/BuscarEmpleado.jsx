import React, { useState } from "react";

export default function BuscarEmpleado() {
    const [searchTerm, setSearchTerm] = useState("");
    const [empleado, setEmpleado] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
        setError("Por favor, ingrese un documento válido.");
        setEmpleado(null);
        return;
        }

        try {
        setError(""); // Limpiar errores previos
        const response = await fetch(
            `http://localhost:8081/api/empleados/obtenerEmpleadoPorDocumento/${searchTerm}`
        );

        if (!response.ok) {
            throw new Error("No se encontró el usuario.");
        }

        const data = await response.json();
        setEmpleado(data); // Guardar los datos obtenidos
        } catch (err) {
        setError(err.message); // Mostrar el mensaje de error
        setEmpleado(null); // Limpiar datos previos
        }
    };

    return (
        <div>
        <h2>Buscar Empleado</h2>
        <input
            type="search"
            placeholder="Ingrese el documento (ej: 31507343)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
            onClick={handleSearch}
        >
            Buscar
        </button>
        {error && <p>{error}</p>}
        {empleado && (
            <div className="box-conteiner color">
                <div className="caja">{empleado.documento}</div>
                <div></div>
            </div>
        )}
        </div>
    );
}

