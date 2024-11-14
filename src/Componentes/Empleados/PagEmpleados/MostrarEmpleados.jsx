import React, {useState, useEffect} from "react";

export default function MostrarEmpleados(){
    const[empleadosList, setEmpleadosList] = useState([]);

    async function getEmpleados() {
        let respuesta = await fetch("http://localhost:8081/api/empleados/obtenerTodosLosEmpleados");
        let empleados = await respuesta.json();
        console.log(empleados);
        setEmpleadosList(empleados)
    }

    useEffect(
        () => {getEmpleados()}, []
    )

    return(
        <div>
            <div>
                {
                    empleadosList.map( (e) => (
                        <div>
                            <div className="box-conteiner color">
                                <div className="caja">{e.persona.nombre}</div>
                                <div className="caja">{e.persona.documento}</div>
                                <div></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}