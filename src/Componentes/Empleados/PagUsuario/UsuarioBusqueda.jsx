import React, { useState, useEffect } from "react";

export default function BuscadorGeneral() {
    const [tipoBusqueda, setTipoBusqueda] = useState(""); // Tipo de búsqueda seleccionada
    const [inputValor, setInputValor] = useState(""); // Valor ingresado
    const [resultado, setResultado] = useState([]); // Resultado de la búsqueda
    const [mensaje, setMensaje] = useState(""); // Mensaje de error o estado

    useEffect(() => {
        if (!inputValor.trim()) {
            setMensaje("Ingrese un dato para buscar.");
            setResultado([]);
            return;
        }

        if (!tipoBusqueda) {
            setMensaje("Seleccione un tipo de búsqueda.");
            setResultado([]);
            return;
        }

        const realizarBusqueda = async () => {
            let url = "";
            let valorParaBuscar = inputValor.trim();

            // Determina si el valor debe ser numérico o una cadena
            const necesitaNumero = [
                "edificio", // Código de edificio (int)
                "unidadHabitantes", // ID unidad (int)
                "unidadDuenios", // ID unidad (int)
                "unidadInquilinos", // ID unidad (int)
            ];

            if (necesitaNumero.includes(tipoBusqueda)) {
                const valorNumerico = parseInt(valorParaBuscar, 10);
                if (isNaN(valorNumerico)) {
                    setMensaje("El dato ingresado debe ser un número.");
                    setResultado([]);
                    return;
                }
                valorParaBuscar = valorNumerico; // Usa el número para la búsqueda
            }

            // URLs según tipo de búsqueda
            switch (tipoBusqueda) {
                case "usuario":
                    url = `http://localhost:8081/api/usuarios/obtenerUsuarioPorDocumento/${valorParaBuscar}`; // String
                    break;
                case "edificio":
                    url = `http://localhost:8081/api/edificios/obtenerHabitantesPorEdificio/${valorParaBuscar}`; // Int
                    break;
                case "unidadHabitantes":
                    url = `http://localhost:8081/api/unidades/habitantesPorUnidad/${valorParaBuscar}`; // Int
                    break;
                case "unidadDuenios":
                    url = `http://localhost:8081/api/unidades/dueniosPorUnidad/${valorParaBuscar}`; // Int
                    break;
                case "edificioDuenios":
                    url = `http://localhost:8081/api/duenios/dueniosPorEdificio/${valorParaBuscar}`; // String
                    break;
                case "unidadInquilinos":
                    url = `http://localhost:8081/api/unidades/inquilinosPorUnidad/${valorParaBuscar}`; // Int
                    break;
                default:
                    setMensaje("Seleccione un tipo de búsqueda válido.");
                    return;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok && data.length > 0) {
                    setResultado(data);
                    setMensaje("");
                } else {
                    setMensaje("No se encontraron resultados.");
                    setResultado([]);
                }
            } catch (error) {
                setMensaje("Error en la búsqueda. Por favor, intente nuevamente.");
                setResultado([]);
            }
        };

        // Ejecuta la búsqueda cuando el inputValor cambia
        realizarBusqueda();
    }, [inputValor, tipoBusqueda]); // Dependencias: ejecuta el efecto cuando cambian

    return (
        <div>
            {/* Selección del tipo de búsqueda */}
            <label htmlFor="tipoBusqueda">Tipo de Búsqueda:</label>
            <select
                id="tipoBusqueda"
                value={tipoBusqueda}
                onChange={(e) => setTipoBusqueda(e.target.value)}
            >
                <option value="">Seleccione una opción</option>
                <option value="usuario">Buscar Usuario</option>
                <option value="edificio">Buscar Habitantes por Edificio</option>
                <option value="unidadHabitantes">Buscar Habitantes por Unidad</option>
                <option value="unidadDuenios">Buscar Dueños por Unidad</option>
                <option value="edificioDuenios">Buscar Dueños por Edificio</option>
                <option value="unidadInquilinos">Buscar Inquilinos por Unidad</option>
            </select>

            {/* Campo de entrada para el valor de búsqueda */}
            <div>
                <label htmlFor="inputValor">Ingrese el dato:</label>
                <input
                    id="inputValor"
                    type="text"
                    value={inputValor}
                    onChange={(e) => setInputValor(e.target.value)}
                    placeholder="Ej: DNI31427890 o ID de unidad"
                />
            </div>

            {/* Resultados de la búsqueda */}
            <div>
                {mensaje && <p>{mensaje}</p>}
                {resultado.length > 0 && (
                    <ul>
                        {resultado.map((item, index) => (
                            <li key={index}>
                                {JSON.stringify(item, null, 2)} {/* Renderiza los datos */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
