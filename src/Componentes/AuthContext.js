import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
    const [userDocument, setUserDocument] = useState(localStorage.getItem('userDocument') || null);

    const login = (role, document) => {
        setUserRole(role);
        setUserDocument(document);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userDocument', document); // Guardar el documento
    };

    const logout = () => {
        setUserRole(null);
        setUserDocument(null);
        localStorage.removeItem('userRole');
        localStorage.removeItem('userDocument');
    };

    return (
        <AuthContext.Provider value={{ userRole, userDocument, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
