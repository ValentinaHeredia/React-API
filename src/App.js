import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EmpleadosV from './Componentes/EmpleadosV';
import UsuariosV from './Componentes/UsuariosV';
import Login from './Componentes/Login';




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Login/>}/>
        <Route path='Empleados' element={<EmpleadosV/>}/>
        <Route path='Usuarios' element={<UsuariosV/>}/>
      </Routes>
    </BrowserRouter >
  );
}

export default App;