import React,{useState, useEffect} from 'react';

import './App.css';

import VistaEmpleado from './Componentes/VistaEmpleado';
import VistaUsuario from './Componentes/VistaUsuario';



function App() {

  return (
    <div>
      {/*
      <VistaUsuario/>

      */}
      <VistaEmpleado/> 
    </div>
  );
}

export default App;
