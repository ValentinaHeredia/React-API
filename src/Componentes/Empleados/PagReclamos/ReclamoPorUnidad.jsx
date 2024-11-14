import React, { useEffect, useState } from "react";

export default function ReclamoPorUnidad() {
    const [code, setCode] = useState(''); 
    const [reclamo, setReclamo] = useState(null); 
    const [error, setError] = useState(null);  

    const handleChange = async (event) => {
        const value = event.target.value;
        setCode(value);

        if (value.trim() === '') {
            setReclamo(null);
            setError(null);
            return;
        }

        const numericCode = parseInt(value, 10);
        if (isNaN(numericCode)) {
            setError('El código debe ser un número válido.');
            setReclamo(null);
            return;
        }

        await buscarReclamo(numericCode);
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
        const numericCode = parseInt(code, 10);

        if (isNaN(numericCode) || code.trim() === '') {
        setError('El código debe ser un número válido.');
        setReclamo(null);
        return;
        }

        await buscarReclamo(numericCode);
        }
    };

    const buscarReclamo = async (numericCode) => {
        try {
            const response = await fetch(`http://localhost:8081/api/reclamos/reclamosPorUnidad/${numericCode}`);
            const data = await response.json();

            if (response.ok) {
                setReclamo(data);
                setError(null);
            } else {
                setError('No existe este edificio');
                setReclamo(null);
            }
        } catch (error) {
            setError('Error en la búsqueda.');
            setReclamo(null);
        }
    };

    return (
        <div>
        <input
            type="search"
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ingresa el código del producto"
        />

        {error && <p>{error}</p>}

        {reclamo && (
            <>
                <div className="color">
                    <div className="box-conteiner">
                        <div className="caja">{reclamo.idReclamo}</div>
                        <div className="caja">{reclamo.estado}</div>
                        <div className="caja">{reclamo.fecha}</div>
                    </div>
                    <div className="box-conteiner">
                        <div className="caja">Edificio: {reclamo.codigo}</div>
                        <div className="caja">Unidad / Area comun: {reclamo.identificador}</div>
                        <div className="caja">Persona: {reclamo.documento}</div>
                        <div className="caja">tipo: {reclamo.tipoReclamo}</div>
                    </div>
                    <div className="box-conteiner">
                        <div className="caja">Descripcion: {reclamo.descripcion}</div>
                    </div>
                </div>
            </>
        )}
    </div>
    );
}
