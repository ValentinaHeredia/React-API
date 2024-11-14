import React, {useState, useEffect} from "react";

export default function MostrarEdificios(){
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

    return(
        <div>
            <div>
                {
                    edificioList.map( (e) => (
                        <div>
                            <div className="box-conteiner color">
                                <div className="caja">{e.codigo}</div>
                                <div className="caja">{e.nombre}</div>
                                <div className="caja">{e.direccion}</div>
                                <div></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}