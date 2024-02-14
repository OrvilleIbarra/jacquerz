import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

function App() {
  const [scanResult, setScanResult] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
          const selectedDeviceId = videoInputDevices[0].deviceId;
          codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
            if (result) {
              // Procesa el resultado aquí
              setScanResult(result.getText());
              // Detiene la decodificación después de recibir un resultado
              codeReader.reset();
            }
            if (err && err !== 'NotFoundException') {
              // Log de errores aquí
              console.error(err);
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // Detiene la decodificación cuando el componente se desmonte
    return () => {
      codeReader.reset();
    };
  }, []);

  const handleFileChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const image = await fileToImage(file);
      const codeReader = new BrowserMultiFormatReader();
      try {
        const result = await codeReader.decodeFromImage(undefined, image.src);
        setScanResult(result.getText());
      } catch (error) {
        console.error('Error decoding file', error);
        setScanResult('No QR code or Code 128 found');
      } finally {
        codeReader.reset();
      }
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

  return (
    <div className="App">
      <header className="App-header">
        <h2>QR and Code 128 Scanner</h2>
        <video ref={videoRef} style={{ width: '100%' }}></video>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {scanResult && <p>Scan Result: {scanResult}</p>}
      </header>
    </div>
  );
}

export default App;
