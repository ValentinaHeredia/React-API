import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';

function MostrarReclamosAreasComunes() {
    const { userDocument } = useAuth();
    const [reclamos, setReclamos] = useState([]);
    const [error, setError] = useState(null);
    const [detallesVisibles, setDetallesVisibles] = useState({}); 
    const toggleDetalle = (idReclamo) => {
        setDetallesVisibles((prev) => ({
            ...prev,
            [idReclamo]: !prev[idReclamo], // Alterna la visibilidad del detalle correspondiente
        }));
    };


    useEffect(() => {
        if (userDocument) {
            fetch(`http://localhost:8081/api/usuarios/reclamosAreasComunesDeUnUsuario/${userDocument}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('No hay reclamos Areas Comun');
                    }
                    return response.json();
                })
                .then((data) => setReclamos(data))
                .catch((error) => setError(error.message));
        }
    }, [userDocument]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Reclamos de Áreas Comunes</h2>
            {reclamos.length > 0 ? (
                <ul>
                    {reclamos.map((reclamo) => (
                        <div key={reclamo.idReclamo}>
                            <div className="divMostrarRaclamo">
                                <div className="boxDatoUnidad">Reclamo {reclamo.idReclamo}</div>
                                <button
                                    onClick={() => toggleDetalle(reclamo.idReclamo)}
                                    className="btnDetalle botonDetalle"
                                >
                                    {detallesVisibles[reclamo.idReclamo] ? "Ocultar Detalle" : "Mostrar Detalle"}
                                </button>
                            </div>
                            {detallesVisibles[reclamo.idReclamo] && (
                            <div className="detalleExtraMR">
                                <p><strong>Documento:</strong> {reclamo.documento}</p>
                                <p><strong>Código:</strong> {reclamo.codigo}</p>
                                <p><strong>Ubicación:</strong> {reclamo.ubicacion}</p>
                                <p><strong>Identificador:</strong> {reclamo.identificador}</p>
                                <p><strong>Descripción:</strong> {reclamo.descripcion}</p>
                                <p><strong>Estado:</strong> {reclamo.estado}</p>
                                <p><strong>Tipo de Reclamo:</strong> {reclamo.tipoReclamo}</p>
                                <p><strong>Medidas Tomadas:</strong> {reclamo.medidasTomadas}</p>
                                <p><strong>Fecha:</strong> {reclamo.fecha}</p>
                            </div>
                            )}
                            <hr />
                        </div>
                    ))}
                </ul>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default MostrarReclamosAreasComunes;
