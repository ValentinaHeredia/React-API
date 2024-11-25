import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';

function MostrarMisReclamos() {
    const { userDocument } = useAuth();
    const [reclamos, setReclamos] = useState([]);
    const [error, setError] = useState(null);
    const [detallesVisibles, setDetallesVisibles] = useState({}); // Estado para controlar la visibilidad

    useEffect(() => {
        if (userDocument) {
            fetch(`http://localhost:8081/api/reclamos/reclamosPorPersona/${userDocument}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los reclamos');
                    }
                    return response.json();
                })
                .then((data) => setReclamos(data))
                .catch((error) => setError(error.message));
        }
    }, [userDocument]);

    const toggleDetalle = (idReclamo) => {
        setDetallesVisibles((prev) => ({
            ...prev,
            [idReclamo]: !prev[idReclamo], // Alterna la visibilidad del detalle correspondiente
        }));
    };

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div>
            <h2 className='textcenter'>Mis Reclamos</h2>
            {reclamos.length > 0 ? (
                reclamos.map((reclamo) => (
                    <div key={reclamo.idReclamo}  className='centrarUnidad'>
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
                    </div>
                ))
            ) : (
                <p>No hay reclamos registrados.</p>
            )}
        </div>
    );
}

export default MostrarMisReclamos;
