import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';

function MostrarMisReclamos() {
    const { userDocument } = useAuth();
    const [reclamos, setReclamos] = useState([]);
    const [error, setError] = useState(null);

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

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Mis Reclamos</h2>
            {reclamos.length > 0 ? (
                <ul>
                    {reclamos.map((reclamo) => (
                        <li key={reclamo.idReclamo}>
                            <strong>ID Reclamo:</strong> {reclamo.idReclamo} <br />
                            <strong>Documento:</strong> {reclamo.documento} <br />
                            <strong>Código:</strong> {reclamo.codigo} <br />
                            <strong>Ubicación:</strong> {reclamo.ubicacion} <br />
                            <strong>Identificador:</strong> {reclamo.identificador} <br />
                            <strong>Descripción:</strong> {reclamo.descripcion} <br />
                            <strong>Estado:</strong> {reclamo.estado} <br />
                            <strong>Tipo de Reclamo:</strong> {reclamo.tipoReclamo} <br />
                            <strong>Medidas Tomadas:</strong> {reclamo.medidasTomadas} <br />
                            <strong>Fecha:</strong> {reclamo.fecha} <br />
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay reclamos registrados.</p>
            )}
        </div>
    );
    
}

export default MostrarMisReclamos;
