import React from 'react';
// Reutiliza el mismo componente Scanner para la salida
import App from './barcode.js';

function SalidaScanner() {
  return (
    <div>
      <h2>Registrar Salida</h2>
      <App />
    </div>
  );
}

export default SalidaScanner;
