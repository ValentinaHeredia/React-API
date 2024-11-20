import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';


import EmpleadosV from './Componentes/EmpleadosV';
import UsuariosV from './Componentes/UsuariosV';
import Login from './Componentes/Login';
import Edificios from './Componentes/Empleados/PagEdificios/Edificios';
import Unidades from './Componentes/Empleados/PagUnidades/Unidades';
import { AuthProvider } from './Componentes/AuthContext';
import ProtectedRoute from './Componentes/ProtectedRoute';
import Personas from './Componentes/Empleados/PagPersonas/Personas';
import Reclamos from './Componentes/Empleados/PagReclamos/Reclamos';
import Usuario from './Componentes/Empleados/PagUsuario/Usuario';
import Empleado from './Componentes/Empleados/PagEmpleados/Empleado';

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
            <Route path="Reclamos" element={<Reclamos />} />
            <Route path="Personas" element={<Personas />} />
            <Route path="Usuarios" element={<Usuario />} />
            <Route path="Empleados" element={<Empleado />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
