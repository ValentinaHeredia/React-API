import React,{useState, useEffect} from 'react';
import Edificios from './Componentes/Empleados/PagEdificios/Edificios';
import './App.css';
import Empleado from './Componentes/Empleados/PagEmpleados/Empleado';
import Reclamos from './Componentes/Empleados/PagReclamos/Reclamos';
import Usuario from './Componentes/Empleados/PagUsuario/Usuario';
import Personas from './Componentes/Empleados/PagPersonas/Personas';
import Unidades from './Componentes/Empleados/PagUnidades/Unidades';



function App() {

  return (
    <div>
      {/*
      <Edificios/>
      <Unidades/>
      <Reclamos/>
      <Empleado/>

      <Personas/>
      */}
      <Usuario/>
    </div>
  );
}

export default App;
