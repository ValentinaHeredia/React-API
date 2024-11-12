import React, { useEffect, useState } from 'react'


        const Componente = () => {
        const [edificio, setEdificio] = useState([]);
        async function getEdificio(){
            let respuesta = await fetch("http://localhost:8081/api/personas/obtenerTodasLasPersonas");
            let data = await respuesta.json();
            setEdificio(data) 
            console.log(data)
        }
        useEffect(()=> {getEdificio()},[edificio])
        return (
        <div>
            <button onClick={getEdificio}>Buscar Persona</button>
            {edificio.map((e) => (
                <div>{e.nombre}</div>
            ))}
        </div>
        )
    }
export default Componente;