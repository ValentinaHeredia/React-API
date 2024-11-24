import React, { useState } from "react";

export default function BuscarUsuario() {
    const [searchTerm, setSearchTerm] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState("");

    const handleChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setUsuario(null);
            setError("");
            return;
        }

        await buscarUsuario(value);
    };

    const buscarUsuario = async (documento) => {
        try {
            const response = await fetch(
                `http://localhost:8081/api/usuarios/obtenerUsuarioPorDocumento/${documento}`
            );
            const data = await response.json();

            if (response.ok) {
                setUsuario(data);
                setError("");
            } else {
                setError("No se encontró el usuario.");
                setUsuario(null);
            }
        } catch (err) {
            setError("Error en la búsqueda.");
            setUsuario(null);
        }
    };

    return (
        <div>
            <label className="buscarLabel">Buscar</label>
            <input
                type="search"
                placeholder="Ingrese el documento (ej: 31507343)"
                value={searchTerm}
                onChange={handleChange}
                className="inputFunciones"
            />
            {error && <p>{error}</p>}
            {usuario && (
                <div className="boxDatos">
                    <div className="boxDato">Documento: {usuario.documento}</div>
                    <div className="boxDato">Contraseña: {usuario.contrasenia}</div>
                    {/* Puedes agregar más detalles del usuario aquí */}
                </div>
            )}
        </div>
    );
}