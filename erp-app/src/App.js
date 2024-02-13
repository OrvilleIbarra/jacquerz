import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Componentes para las vistas de escáner
import EntradaScanner from './EntradaScanner';
import SalidaScanner from './SalidaScanner';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>Bienvenido</h2>
          <Link to="/entrada"><button>Registrar Entrada</button></Link>
          <Link to="/salida"><button>Registrar Salida</button></Link>
        </header>
        <Routes>
          <Route path="/entrada" element={<EntradaScanner />} />
          <Route path="/salida" element={<SalidaScanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
