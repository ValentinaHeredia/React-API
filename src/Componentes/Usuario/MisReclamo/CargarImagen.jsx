import React, { useState, useRef } from 'react';

export default function CargarImagen  ()  {
    // Estados para el número de reclamo y el archivo
    const [idReclamo, setidReclamo] = useState('');
    const [file, setFile] = useState(null);
    const [tipoImagen, setTipoImagen] = useState(''); // Aquí puedes agregar lógica para definir el tipo de imagen
    const fileInput = useRef(null); // Para acceder al input del archivo

    // Maneja el cambio en el input de número de reclam
    const handleidReclamoChange = (e) => {
        setidReclamo(e.target.value);
    };

    // Maneja el cambio en el input de tipo de imagen (si lo necesitas)
    const handleTipoImagenChange = (e) => {
        setTipoImagen(e.target.value);
    };

    // Maneja la selección del archivo
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Función que maneja el envío del formulario
    const handleFileUpload = async (e) => {
        e.preventDefault(); // Evita que el formulario se recargue

        // Verificar que el número de reclamo esté presente
        if (!idReclamo) {
            alert("Debe ingresar un número de reclamo.");
            return;
        }

        // Verificar que se haya seleccionado un archivo
        if (!file) {
            alert("Debe seleccionar una imagen.");
            return;
        }

        // Crear FormData para enviar el archivo y tipo
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tipo", tipoImagen);

        try {
            const response = await fetch(`http://localhost:8081/api/reclamos/agregarImagenAReclamo/${idReclamo}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            // Verificar si la respuesta es exitosa
            if (response.ok) {
                alert("Imagen cargada exitosamente");
                console.log(data); // Puedes hacer algo más con la respuesta
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            alert("Hubo un error al cargar la imagen.");
        }
    };

    return (
        <div>
            <h2>Cargar Imagen para Reclamo</h2>
            <form onSubmit={handleFileUpload}>
                <div>
                    <label>Numero de Reclamo:</label>
                    <input
                        type="text"
                        value={idReclamo}
                        onChange={handleidReclamoChange}
                        placeholder="Ingrese el número de reclamo"
                    />
                </div>

                <div>
                    <label>Tipo de Imagen:</label>
                    <input
                        type="text"
                        value={tipoImagen}
                        onChange={handleTipoImagenChange}
                        placeholder="Ingrese el tipo de imagen"
                    />
                </div>

                <div>
                    <label>Seleccionar Imagen:</label>
                    <input
                        type="file"
                        ref={fileInput}
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit">Cargar Imagen</button>
            </form>
        </div>
    );
};

