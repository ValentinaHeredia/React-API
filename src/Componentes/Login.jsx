// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = () => {
        if (role === "empleado") {
            navigate("/empleados");
        } else if (role === "usuario") {
            navigate("/usuarios");
        } else {
            alert("Por favor, seleccione una opción");
        }
    };

    return (
        <div>
            <label htmlFor="opciones">Entrar como</label>
            <select name="opciones" id="opciones" onChange={handleRoleChange} value={role}>
                <option value="" disabled hidden>Seleccione una opción</option>
                <option value="empleado">Empleado</option>
                <option value="usuario">Usuario</option>
            </select>
            <button onClick={handleSubmit}>Ingresar</button>
        </div>
    );
}
