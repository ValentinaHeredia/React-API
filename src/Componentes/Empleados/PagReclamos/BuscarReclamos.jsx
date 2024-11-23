import React, { useEffect, useState } from "react";

function BuscarReclamos() {
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
            const response = await fetch(`http://localhost:8081/api/reclamos/buscarReclamo/${numericCode}`);
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
        <label className="buscarLabel">Buscar</label>
        <input className='inputFunciones'
            type="search"
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ingresa el código del producto"
        />

        {error && <p>{error}</p>}

        {reclamo && (
            <>
                <div>
                    <div className="boxDatos">
                        <div className="boxDato">{reclamo.idReclamo}</div>
                        <div className="boxDato">{reclamo.estado}</div>
                        <div className="boxDato">{reclamo.fecha}</div>
                    </div>
                    <div className="boxDatos">
                        <div className="boxDato">Edificio: {reclamo.codigo}</div>
                        <div className="boxDato">Unidad / Area comun: {reclamo.identificador}</div>
                        <div className="boxDato">Persona: {reclamo.documento}</div>
                        <div className="boxDato">tipo: {reclamo.tipoReclamo}</div>
                    </div>
                    <div className="boxDatos">
                        <div className="boxDato">Descripcion: {reclamo.descripcion}</div>
                    </div>
                </div>
            </>
        )}
    </div>
    );
}

export default BuscarReclamos;
