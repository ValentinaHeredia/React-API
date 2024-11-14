import React, {useState, useEffect} from "react";
const[edificioList, setEdificioList] = useState([]);
async function getEdificios() {
    let respuesta = await fetch("http://localhost:8081/api/edificios/obtenerTodosLosEdificios");
    let edificios = await respuesta.json();
    console.log(edificios);
    setEdificioList(edificios)
}

useEffect(
    () => {getEdificios()}, []
)

