import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userRole, setUserRole] = useState(null); // null, 'Usuario', 'Empleado', etc.

    const login = (role) => {
        setUserRole(role);
    };

    const logout = () => {
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ userRole, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

    export function useAuth() {
    return useContext(AuthContext);
}
