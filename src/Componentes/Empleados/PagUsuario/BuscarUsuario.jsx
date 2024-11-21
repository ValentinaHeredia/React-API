import React, { useState } from "react";

export default function BuscarUsuario() {
    const [searchTerm, setSearchTerm] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
        setError("Por favor, ingrese un documento válido.");
        setUsuario(null);
        return;
        }

        try {
        setError(""); // Limpiar errores previos
        const response = await fetch(
            `http://localhost:8081/api/usuarios/obtenerUsuarioPorDocumento/${searchTerm}`
        );

        if (!response.ok) {
            throw new Error("No se encontró el usuario.");
        }

        const data = await response.json();
        setUsuario(data); // Guardar los datos obtenidos
        } catch (err) {
        setError(err.message); // Mostrar el mensaje de error
        setUsuario(null); // Limpiar datos previos
        }
    };

    return (
        <div>
        <input
            type="search"
            placeholder="Ingrese el documento (ej: 31507343)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="botones"
            onClick={handleSearch}
        >
            Buscar
        </button>
        {error && <p>{error}</p>}
        {usuario && (
            <div className="box-conteiner color">
                <div className="caja">{usuario.documento}</div>
                <div></div>
            </div>
        )}
        </div>
    );
}

