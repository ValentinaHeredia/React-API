import React, { useState } from "react";

export default function BuscarEmpleado() {
    const [searchTerm, setSearchTerm] = useState("");
    const [empleado, setEmpleado] = useState(null);
    const [error, setError] = useState("");

    const handleChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
        setEmpleado(null);
        setError("");
        return;
        }

        await buscarEmpleado(value);
    };

    const buscarEmpleado = async (documento) => {
        try {
        const response = await fetch(
            `http://localhost:8081/api/empleados/obtenerEmpleadoPorDocumento/${documento}`
        );
        const data = await response.json();

        if (response.ok) {
            setEmpleado(data);
            setError("");
        } else {
            setError("No se encontró el empleado.");
            setEmpleado(null);
        }
        } catch (err) {
        setError("Error en la búsqueda.");
        setEmpleado(null);
        }
    };

    return (
        <div>
        <label className="buscarLabel">Buscar</label>
        <input
            type="search"
            placeholder="Ingrese el documento"
            value={searchTerm}
            onChange={handleChange}
            className="inputFunciones"
        />
        {error && <p>{error}</p>}
        {empleado && (
            <div className="boxDatos">
            <div className="boxDato">Documento: {empleado.documento}</div>
            <div className="boxDato">Contraseña: {empleado.contrasenia}</div>
            </div>
        )}
        </div>
    );
}
