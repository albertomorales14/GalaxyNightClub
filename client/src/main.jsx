import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/login.css';
import './styles/home.css';
import './styles/gestionClub.css';
import './styles/dj.css';
import './styles/almacen.css';
import './styles/ventas.css';
import './styles/mejoras.css';
import './styles/modal.css';
import './styles/settings.css';
import './styles/mobile.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
