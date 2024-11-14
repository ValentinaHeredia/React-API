import React, { useEffect, useState } from "react";

function BuscarEdificio() {
  const [code, setCode] = useState(''); 
  const [edificio, setEdificio] = useState(null); 
  const [error, setError] = useState(null);  

  const handleChange = async (event) => {
    const value = event.target.value;
    setCode(value);

    if (value.trim() === '') {
      setEdificio(null);
      setError(null);
      return;
    }

    const numericCode = parseInt(value, 10);
    if (isNaN(numericCode)) {
      setError('El código debe ser un número válido.');
      setEdificio(null);
      return;
    }

    await buscarEdificio(numericCode);
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const numericCode = parseInt(code, 10);

      if (isNaN(numericCode) || code.trim() === '') {
        setError('El código debe ser un número válido.');
        setEdificio(null);
        return;
      }

      await buscarEdificio(numericCode);
    }
  };

  const buscarEdificio = async (numericCode) => {
    try {
      const response = await fetch(`http://localhost:8081/api/edificios/obtenerEdificioPorCodigo/${numericCode}`);
      const data = await response.json();

      if (response.ok) {
        setEdificio(data);
        setError(null);
      } else {
        setError('No existe este edificio');
        setEdificio(null);
      }
    } catch (error) {
      setError('Error en la búsqueda.');
      setEdificio(null);
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

      {edificio && (
        <div className="box-conteiner color">
          <div className="caja">{edificio.codigo}</div>
          <div className="caja">{edificio.nombre}</div>
          <div className="caja">{edificio.direccion}</div>
        </div>
      )}
    </div>
  );
}

export default BuscarEdificio;
