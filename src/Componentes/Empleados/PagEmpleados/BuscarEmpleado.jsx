import React, { useState } from "react";

export default function BuscarEmpleado() {
    const [documento, setDocumento] = useState("");
    const [empleado, setEmpleado] = useState(null);
    const [error, setError] = useState("");

    const buscarEmpleado = async () => {
        if (!documento) {
        setError("Por favor, ingresa un documento válido.");
        return;
        }

        try {
        const response = await fetch(`http://localhost:8081/api/empleados/obtenerEmpleadoPorDocumento/${documento}`);
        
        if (!response.ok) {
            throw new Error("No se encontró ningún empleado con el documento proporcionado.");
        }

        const data = await response.json();
        setEmpleado(data);
        setError(""); // Limpiar errores previos
        } catch (err) {
        setEmpleado(null);
        setError(err.message);
        }
    };

    return (
        <div>
        <h1>Buscar Empleado</h1>
        <input
            type="search"
            placeholder="Ingresa el documento (e.g., DNI31058401)"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
        />
        <button onClick={buscarEmpleado}>Buscar</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {empleado && (
            <div>
            <h2>Información del Empleado</h2>
            <p><strong>Nombre:</strong> {empleado.persona.nombre}</p>
            <p><strong>Nombre:</strong> {empleado.persona.documento}</p>
            {/* Agrega más campos según la respuesta de tu API */}
            </div>
        )}
        </div>
    );
}
