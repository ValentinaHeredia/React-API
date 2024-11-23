import React, { useState } from "react";

export default function BuscarPersona() {
    const [searchTerm, setSearchTerm] = useState("");
    const [persona, setPersona] = useState(null);
    const [error, setError] = useState("");

    const handleChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setPersona(null);
            setError("");
            return;
        }

        await buscarPersona(value);
    };

    const buscarPersona = async (documento) => {
        try {
            const response = await fetch(
                `http://localhost:8081/api/personas/buscarPersona/${documento}`
            );
            const data = await response.json();

            if (response.ok) {
                setPersona(data);
                setError("");
            } else {
                setError("No se encontró la persona.");
                setPersona(null);
            }
        } catch (err) {
            setError("Error en la búsqueda.");
            setPersona(null);
        }
    };

    return (
        <div>
            <label className="buscarLabel">Buscar</label>
            <input className='inputFunciones'
                type="search"
                placeholder="Ingrese el documento"
                value={searchTerm}
                onChange={handleChange}
            />
            {error && <p>{error}</p>}
            {persona && (
                <div className="box-conteiner color">
                    <div className="caja">Documento: {persona.documento}</div>
                    <div className="caja">Nombre: {persona.nombre}</div>
                </div>
            )}
        </div>
    );
}
