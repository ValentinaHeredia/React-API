import React, { useState } from "react";

export default function HabitarUnidad() {
    const [idUnidad, setIdUnidad] = useState(""); // ID de la unidad a habitar
    const [mensaje, setMensaje] = useState(""); // Mensaje de éxito o error

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idUnidad.trim()) {
            setMensaje("Por favor, ingrese un ID de unidad válido.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8081/api/unidades/habitarUnidad/${idUnidad}`,
                { method: "POST" }
            );

            if (response.ok) {
                setMensaje("Unidad habitada exitosamente.");
                setIdUnidad(""); // Limpia el campo después de la acción
            } else {
                setMensaje("Error al intentar habitar la unidad.");
            }
        } catch (error) {
            setMensaje("Error de conexión.");
            console.error(error);
        }
    };

    return (
        <div>
            <p className="subtitulos">Habitar Unidad</p>
            <form onSubmit={handleSubmit}>
                <div className="divInputFunciones">
                    <div className="divFunciones">ID Unidad</div>
                    <input className="inputFunciones"
                        type="text"
                        id="idUnidad"
                        value={idUnidad}
                        onChange={(e) => setIdUnidad(e.target.value)}
                        required
                    />
                </div>
                <button className="botones" type="submit">Habitar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
