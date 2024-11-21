import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
    const [documento, setDocumento] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); // Usar la función login del contexto
    const navigate = useNavigate();

    // Reemplaza el handleLogin por el código actualizado
    const handleLogin = async () => {
        if (!tipoUsuario) {
            setError('Por favor, seleccione un tipo de usuario.');
            return;
        }

        try {
            const url = tipoUsuario === 'Usuario' 
                ? `http://localhost:8081/api/usuarios/loginUsuario/${documento}/${contrasenia}`
                : `http://localhost:8081/api/empleados/loginEmpleado/${documento}/${contrasenia}`;

            const response = await fetch(url, { method: 'POST' });
            const isValid = await response.json();

            if (isValid) {
                login(tipoUsuario, documento); // También pasar el documento
                navigate(tipoUsuario === 'Usuario' ? '/Usuarios/MisReclamos' : '/Empleados/Edificios');
            } else {
                setError('Datos incorrectos');
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
            setError('Ocurrió un error, por favor intente de nuevo.');
        }
    };

    return (
        <div className='body'>
            <div className='loginFormulario'>
                <select className='input' value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
                    <option value="">Entrar como...</option> {/* Opción por defecto vacía */}
                    <option value="Usuario">Usuario</option>
                    <option value="Empleado">Empleado</option>
                </select>
                <div >
                    <input 
                    className='input'
                    type="text"
                    placeholder="Documento"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    className='input'
                    type="password"
                    placeholder="Contraseña"
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                    />
                </div>
                <button onClick={handleLogin} className='botonEnviar'>Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div>   
                <img className='img' src="/fotoLogin.png" alt="" />
            </div>
        </div>
    );
}

export default Login;
