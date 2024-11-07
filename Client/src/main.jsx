import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // Update this line to import App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />  {/* Now rendering App component */}
  </StrictMode>,
);
