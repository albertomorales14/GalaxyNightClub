import Header from '../Header';
import Navigation from '../Navigation';
import { useEffect, useState, useRef } from 'react';
import LoginPage from '../../views/LoginPage';
import useAuth from '../../auth/useAuth';
import Settings from './settings/Settings';
import logService from '../../Utils/logService';

export default function Layout({ children }) {

    const [lista, setLista] = useState([]);
    const { isLogged, user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const clickSettingsButton = () => setIsVisible(false);
    const layoutSettingsRef = useRef(null); // Referencia para el layout Settings
    const layoutHeaderRef = useRef(null); // Referencia para el layout Header
    const layoutPssWdRef = useRef(null); // Referencia para el layout Password
    const layoutImgRef = useRef(null); // Referencia para el layout Imagen

    // Backend
    useEffect(() => {
        const getClub = async () => {
            fetch('http://localhost:5050/api/Club')
                .then(response => response.json())
                .then(data => {
                    // Handle the fetched data here
                    setLista(data);
                    console.log('[Lista de Club] GET llamada a API...');
                    logService.sendLog('info', '[GET] Llamada a la API: Lista de Club (Layout.js)');
                })
                .catch(error => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error);
                    logService.sendLog('error', '[GET] Llamada a la API: Lista de Club (Layout.js): ' + error);
                });
        }
        getClub(); //llamada
    }, []) // sin dependencia variable de estado lista

    // useEffect para manejar clics fuera del layout
    useEffect(() => {
        // Función que se llama en cada clic
        const handleClickOutside = (event) => {
            // Si el clic ocurrió fuera del layout y está visible, oculta el layout
            if ((layoutSettingsRef.current && layoutHeaderRef.current) &&
                (
                    !layoutSettingsRef.current.contains(event.target) &&
                    !layoutHeaderRef.current.contains(event.target)
                )) {
                setIsVisible(false);
            }
        };

        // Agrega el listener de clic al documento cuando el layout está visible
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Remueve el listener cuando el layout no está visible
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Limpieza del listener cuando el componente se desmonta
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    var propietario = lista[0]?.propietario;
    var ubicacion = lista[0]?.ubicacion;

    const showSettings = () => {
        setIsVisible(!isVisible);
    }

    return (
        isLogged() ? (
            <>
                <Header showSettings={showSettings} layoutRef={layoutHeaderRef} />
                <Settings isVisible={isVisible} layoutRef={layoutSettingsRef} layoutPssWdRef={layoutPssWdRef} layoutImgRef={layoutImgRef} clickSettingsButton={clickSettingsButton} />
                <div className='bodyApp'>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 3 }}>
                            <Navigation propietario={propietario} ubicacion={ubicacion} />
                        </div>
                        <div style={{ flex: 9, flexDirection: 'column', display: 'flex' }}>
                            {children}
                        </div>
                    </div>
                </div>
            </>
        ) : (<LoginPage />)

    )
}