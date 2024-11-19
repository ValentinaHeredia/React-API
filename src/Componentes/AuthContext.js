import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userRole, setUserRole] = useState(() => {
        // Recuperar el estado del almacenamiento local al cargar
        return localStorage.getItem('userRole') || null;
    });

    const login = (role) => {
        setUserRole(role);
        localStorage.setItem('userRole', role); // Guardar en localStorage
    };

    const logout = () => {
        setUserRole(null);
        localStorage.removeItem('userRole'); // Eliminar del localStorage
    };

    useEffect(() => {
        // Sincronizar el estado si `userRole` cambia
        if (userRole) {
            localStorage.setItem('userRole', userRole);
        } else {
            localStorage.removeItem('userRole');
        }
    }, [userRole]);

    return (
        <AuthContext.Provider value={{ userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
