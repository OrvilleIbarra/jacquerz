import React, { useState } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';

function App() {
  const [scanResult, setScanResult] = useState('');

  const handleFileChange = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const image = await fileToImage(file);
      scanCode(image);
    }
  };

  const fileToImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const scanCode = async (image) => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.listVideoInputDevices().then((videoInputDevices) => {
      // Este ejemplo es para decodificación de imagen, pero aquí tienes disponible los dispositivos de video
    });

    try {
      const result = await codeReader.decodeFromImage(undefined, image.src);
      setScanResult(result.getText());
    } catch (error) {
      console.error('Error decoding file', error);
      setScanResult('No QR code found');
    } finally {
      codeReader.reset();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>QR Code Scanner</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {scanResult && <p>Scan Result: {scanResult}</p>}
      </header>
    </div>
  );
}

export default App;
