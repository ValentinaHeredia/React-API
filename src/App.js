import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EmpleadosV from './Componentes/EmpleadosV';
import UsuariosV from './Componentes/UsuariosV';
import Login from './Componentes/Login';
import Edificios from './Componentes/Empleados/PagEdificios/Edificios';
import Unidades from './Componentes/Empleados/PagUnidades/Unidades';
import { AuthProvider } from './Componentes/AuthContext';
import ProtectedRoute from './Componentes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Usuarios"
            element={
              <ProtectedRoute requiredRole="Usuario">
                <UsuariosV />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Empleados"
            element={
              <ProtectedRoute requiredRole="Empleado">
                <EmpleadosV />
              </ProtectedRoute>
            }
          >
            <Route path="Edificios" element={<Edificios />} />
            <Route path="Unidades" element={<Unidades />} />
            {/* Otras rutas protegidas */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
