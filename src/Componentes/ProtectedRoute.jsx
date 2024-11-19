import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children, requiredRole }) {
    const { userRole } = useAuth();

    if (!userRole) {
        return <Navigate to="/" />; // Redirige al login si no está autenticado
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" />; // Redirige si no tiene el rol adecuado
    }

    return children;
}

export default ProtectedRoute;
