import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
    const [documento, setDocumento] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState(''); // No hay opción seleccionada por defecto
    const [error, setError] = useState('');
    const { login } = useAuth(); // Usar la función login del contexto
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!tipoUsuario) {
        setError('Por favor, seleccione un tipo de usuario.');
        return;
        }

        try {
        const url = tipoUsuario === 'Usuario' 
            ? `http://localhost:8081/api/usuarios/loginUsuario/${documento}/${contrasenia}`
            : `http://localhost:8081/api/empleados/loginEmpleado/${documento}/${contrasenia}`;

        const response = await fetch(url, {
            method: 'POST',
        });

        const isValid = await response.json();

        if (isValid) {
            // Actualizar el rol del usuario en el contexto y navegar a la página correspondiente
            login(tipoUsuario);
            if (tipoUsuario === 'Usuario') {
            navigate('/Usuarios');
            } else {
            navigate('/Empleados');
            }
        } else {
            setError('Datos incorrectos');
        }
        } catch (error) {
        console.error('Error en la autenticación:', error);
        setError('Ocurrió un error, por favor intente de nuevo.');
        }
    };

    return (
        <div>
        <h2>Login</h2>
        <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
            <option value="">Seleccione un tipo de usuario</option> {/* Opción por defecto vacía */}
            <option value="Usuario">Usuario</option>
            <option value="Empleado">Empleado</option>
        </select>
        <div>
            <input
            type="text"
            placeholder="Documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            />
        </div>
        <div>
            <input
            type="password"
            placeholder="Contraseña"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            />
        </div>
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;
