import React, { useEffect, useState } from "react";

function BuscarUnidades() {
    const [code, setCode] = useState(""); 
    const [u, setUnidad] = useState(null); 
    const [error, setError] = useState(null);  
    const [detallesVisibles, setDetallesVisibles] = useState({});

    const handleChange = async (event) => {
        const value = event.target.value;
        setCode(value);

        if (value.trim() === "") {
            setUnidad(null);
            setError(null);
            return;
        }

        const numericCode = parseInt(value, 10);
        if (isNaN(numericCode)) {
            setError("El código debe ser un número válido.");
            setUnidad(null);
            return;
        }

        await buscarUnidades(numericCode);
    };

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            const numericCode = parseInt(code, 10);

            if (isNaN(numericCode) || code.trim() === "") {
                setError("El código debe ser un número válido.");
                setUnidad(null);
                return;
            }

            await buscarUnidades(numericCode);
        }
    };

    const buscarUnidades = async (numericCode) => {
        try {
            const response = await fetch(`http://localhost:8081/api/unidades/obtenerUnidadPorCodigo/${numericCode}`);
            const data = await response.json();

            if (response.ok) {
                setUnidad(data);
                setError(null);
            } else {
                setError("No existe esta unidad.");
                setUnidad(null);
            }
        } catch (error) {
            setError("Error en la búsqueda.");
            setUnidad(null);
        }
    };

    const toggleDetalle = (id) => {
        setDetallesVisibles((prev) => ({
            ...prev,
            [id]: !prev[id], // Alterna la visibilidad del detalle correspondiente
        }));
    };

    return (
        <div>
            <label className="buscarLabel">Buscar</label>
            <input className="inputFunciones"
                type="search"
                value={code}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="ID unidad"
            />

            {error && <p>{error}</p>}

            {u && (
                <div className="color">
                        <div className="boxDatosUnidad">
                            <div className="boxDatoUnidad">ID: {u.identificador}</div>
                            <div className="boxDatoUnidad">Piso: {u.piso}</div>
                            <div className="boxDatoUnidad">Número: {u.numero}</div>
                            <div className="boxDatoUnidad">Código de Edificio: {u.codigoEdificio}</div>

                            <button onClick={() => toggleDetalle(u.identificador)} className="btnDetalle botonDetalle">
                                {detallesVisibles[u.identificador] ? "Ocultar Detalle" : "Mostrar Detalle"}
                            </button>
                        </div>
                        {detallesVisibles[u.identificador] && (
                        <div className="detalleExtra">
                            <div className="habitado">
                                <div className="habitado">Habitado: {u.habitado === "t" ? "Sí" : "No"}</div>
                            </div>
                            <div className="personas">
                                <div>
                                    <h4>dueño/s</h4>
                                    {u.duenios && u.duenios.length > 0 ? (
                                        u.duenios.map((duenio, index) => (
                                            <div key={index} className="">
                                                Documento: {duenio.documento} - Nombre: {duenio.nombre}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="">Sin dueños registrados</div>
                                    )}
                                </div>
                                <div>
                                <h4>Inquilinos:</h4>
                                {u.inquilinos && u.inquilinos.length > 0 ? (
                                    u.inquilinos.map((inquilino, index) => (
                                        <div key={index} className="caja">
                                            Documento: {inquilino.documento} - Nombre: {inquilino.nombre}
                                        </div>
                                    ))
                                ) : (
                                    <div className="caja">Sin inquilinos registrados</div>
                                )}
                                </div>
                                
                                <div>
                                    <h4>Habitantes:</h4>
                                    {u.habitantes && u.habitantes.length > 0 ? (
                                        u.habitantes.map((habitante, index) => (
                                            <div key={index} className="caja">
                                                Documento: {habitante.documento} - Nombre: {habitante.nombre}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="caja">Sin habitantes registrados</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        )}
                </div>
            )}
        </div>
    );
}

export default BuscarUnidades;
