import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { DealerProvider } from './state/DealerContext.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DealerProvider>
      <App />
    </DealerProvider>
  </React.StrictMode>
);
