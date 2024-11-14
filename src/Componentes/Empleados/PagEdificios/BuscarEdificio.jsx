import React, { useEffect, useState } from "react";

function BuscarEdificio() {
  const [code, setCode] = useState(''); 
  const [edificio, setEdificio] = useState(null); 
  const [error, setError] = useState(null);  

  const handleChange = (event) => {
    setCode(event.target.value); 
  };

  const handleSearch = async () => {
    if (code.trim() === '') { // Verifica si el campo está vacío
      setEdificio(null); // Limpia los datos del edificio
      setError(null); // Limpia cualquier error
      return;
    }

    const numericCode = parseInt(code, 10);  

    if (isNaN(numericCode)) {
      setError('El código debe ser un número válido.');
      setEdificio(null); // Asegúrate de limpiar el estado del edificio aquí también
      return;
    }

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
        placeholder="Ingresa el código del producto"
      />
      <button onClick={handleSearch}>Buscar</button>

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
