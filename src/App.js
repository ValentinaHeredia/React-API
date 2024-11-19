import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EmpleadosV from './Componentes/EmpleadosV';
import UsuariosV from './Componentes/UsuariosV';
import Login from './Componentes/Login';
import Edificios from "./Componentes/Empleados/PagEdificios/Edificios";
import Empleado from "./Componentes/Empleados/PagEmpleados/Empleado";
import Personas from "./Componentes/Empleados/PagPersonas/Personas";
import Reclamos from "./Componentes/Empleados/PagReclamos/Reclamos";
import Unidades from "./Componentes/Empleados/PagUnidades/Unidades";
import Usuario from "./Componentes/Empleados/PagUsuario/Usuario";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Login/>}/>
        <Route path="/Empleados" element={<EmpleadosV />}>
          <Route path="Edificios" element={<Edificios />} />
          <Route path="Unidades" element={<Unidades />} />
          <Route path="Reclamos" element={<Reclamos />} />
          <Route path="Personas" element={<Personas />} />
          <Route path="Usuarios" element={<Usuario />} />
          <Route path="Empleados" element={<Empleado />} />
        </Route>
        <Route path='Usuarios' element={<UsuariosV/>}/>
      </Routes>
    </BrowserRouter >
  );
}

export default App;