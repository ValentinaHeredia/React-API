import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';

function MostrarReclamosAreasComunes() {
    const { userDocument } = useAuth();
    const [reclamos, setReclamos] = useState([]);
    const [error, setError] = useState(null);

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
                        <li key={reclamo.idReclamo}>
                            <strong>ID Reclamo:</strong> {reclamo.idReclamo} <br />
                            <strong>Código:</strong> {reclamo.codigo} <br />
                            <strong>Ubicación:</strong> {reclamo.ubicacion} <br />
                            <strong>Descripción:</strong> {reclamo.descripcion} <br />
                            <strong>Estado:</strong> {reclamo.estado} <br />
                            <strong>Tipo de Reclamo:</strong> {reclamo.tipoReclamo} <br />
                            <strong>Fecha:</strong> {reclamo.fecha} <br />
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default MostrarReclamosAreasComunes;
