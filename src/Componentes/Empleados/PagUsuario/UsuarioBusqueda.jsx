import React, { useState } from "react";

export default function BuscadorUnificado() {
    const [opcion, setOpcion] = useState(""); // Inicialmente vacío para que el usuario deba seleccionar
    const [input, setInput] = useState("");
    const [resultado, setResultado] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const handleOpcionChange = (e) => {
        setOpcion(e.target.value);
        setInput("");
        setResultado(null);
        setMensaje("");
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);

        if (debounceTimeout) clearTimeout(debounceTimeout);

        if (opcion) {
            setDebounceTimeout(
                setTimeout(() => {
                    realizarBusqueda(value.trim());
                }, 500)
            );
        }
    };

    const realizarBusqueda = async (valor) => {
        if (!valor) {
            setResultado(null);
            setMensaje("Por favor, ingresa un valor.");
            return;
        }

        let url = "";
        switch (opcion) {
            case "buscarUsuario":
                url = `http://localhost:8081/api/usuarios/obtenerUsuarioPorDocumento/${valor}`;
                break;
            case "buscarUsuarioPorEdificio":
                url = `http://localhost:8081/api/edificios/obtenerHabitantesPorEdificio/${valor}`;
                break;
            case "buscarDueniosEdificio":
                url = `http://localhost:8081/api/duenios/dueniosPorEdificio/${valor}`;
                break;
            default:
                setMensaje("Por favor, selecciona una funcionalidad.");
                return;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setResultado(data);
                setMensaje("");
            } else {
                setResultado(null);
                setMensaje("No se encontraron resultados.");
            }
        } catch (error) {
            setResultado(null);
            setMensaje("Error de conexión.");
            console.error(error);
        }
    };

    const getPlaceholder = () => {
        switch (opcion) {
            case "buscarUsuario":
                return "Ingrese el Documento";
            case "buscarUsuarioPorEdificio":
                return "Código del Edificio";
            case "buscarDueniosEdificio":
                return "Código del Edificio";
            default:
                return "Selecciona una funcionalidad para comenzar";
        }
    };

    return (
        <div>
            <div className="busquedas">
                <label htmlFor="opcion" className="buscarLabel">Buscar por:</label>
                <select className="selectReclamo" id="opcion" value={opcion} onChange={handleOpcionChange}>
                    <option value="">Seleccionar...</option>
                    <option value="buscarUsuario">Buscar Usuario por Documento</option>
                    <option value="buscarUsuarioPorEdificio">Buscar Usuarios por Edificio</option>
                    <option value="buscarDueniosEdificio">Buscar Dueños por Edificio</option>
                </select>
            </div>

            <div>
                <input
                    className="inputBusquedaReclamos"
                    type="text"
                    id="input"
                    value={input}
                    onChange={handleInputChange}
                    placeholder={getPlaceholder()}
                    disabled={!opcion} // Desactivar el input si no se selecciona una opción
                />
            </div>

            {mensaje && <p>{mensaje}</p>}

            {resultado && opcion === "buscarUsuario" && (
                <div className="boxDatos">
                    <div className="boxDato">{resultado.documento}</div>
                    <div className="boxDato">{resultado.contrasenia}</div>
                </div>
            )}

            {resultado && opcion === "buscarUsuarioPorEdificio" && (
                <div>
                    <ul>
                        {resultado.map((habitante) => (
                            <div key={habitante.id}>
                                <div className="boxDatos">
                                    <div className="boxDato">{habitante.documento}</div>
                                    <div className="boxDato">{habitante.nombre}</div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )}

            {resultado && opcion === "buscarDueniosEdificio" && (
                <div>
                    <ul>
                        {resultado.map((duenio) => (
                            <div className="boxDatos" key={duenio.documento}>
                                <div className="boxDato">{duenio.nombre}</div>
                                <div className="boxDato">{duenio.documento}</div>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
