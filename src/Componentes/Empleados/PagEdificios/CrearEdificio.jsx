import React, { useState } from 'react';

export default function CrearEdificio() {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [mensaje, setMensaje] = useState('');

    const agregarEdificio = async (e) => {
    e.preventDefault();

        try {
            const url = `http://localhost:8081/api/edificios/agregarEdificio/${nombre}/${direccion}`;
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (response.ok) {
                setMensaje('Edificio agregado exitosamente');
                setNombre('');
                setDireccion('');
            } else {
                setMensaje('Error al agregar el edificio');
            }
        } catch (error) {
            setMensaje('Error de conexión');
            console.error(error);
        }
    };

    return (
        <div>
            <p className='subtitulos'>Agregar edificio</p>
            <form onSubmit={agregarEdificio}>
            <div className='divInputFunciones'>
                <div className='divFunciones'>Nombre</div>
                <input className='inputFunciones'
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div className='divInputFunciones'>
                <div className='divFunciones'>Direccion</div>
                <input className='inputFunciones'
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                />
            </div>
            <button className='botones' type="submit">Agregar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
