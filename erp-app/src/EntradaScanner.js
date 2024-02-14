import React from 'react';
// Asumiendo que tienes un componente Scanner que puedes reutilizar
import App from './barcode.js';

function EntradaScanner() {
  return (
    <div>
      <h2>Registrar Entrada</h2>
      <App />
    </div>
  );
}

export default EntradaScanner;
