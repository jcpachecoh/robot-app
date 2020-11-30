import React from 'react';

import './App.css';

import Header from './components/Header'
import Canvas from './components/Canvas';  

function App() {

  return (
    <>
      <Header />
      <Canvas width={1000} height={1000} />
    </>
  );
}

export default App;
