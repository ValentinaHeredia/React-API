async function getEdificio(){
    let respuesta = await fetch("http://localhost:8081/api/edificios/obtenerEdificioPorCodigo/3");
    let edificio = await respuesta.json();
    console.log(edificio)
}

getEdificio();