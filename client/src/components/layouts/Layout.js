import { useEffect, useState, useRef } from 'react';
import Header from '../Header';
import Settings from './settings/Settings';
import Navigation from '../Navigation';
import LoginPage from '../../views/LoginPage';
import useAuth from '../../auth/useAuth';

function Layout({ children }) {

    const { isLogged } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const clickSettingsButton = () => setIsVisible(false);
    const layoutSettingsRef = useRef(null); // Referencia para el layout Settings
    const layoutHeaderRef = useRef(null); // Referencia para el layout Header

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


    const showSettings = () => {
        setIsVisible(!isVisible);
    }
/*
    let requestCounter = 0;

    // Guardar la referencia original de fetch
    const originalFetch = window.fetch;

    // Sobrescribir fetch
    window.fetch = async function (...args) {
        requestCounter++;
        // Llamar a la función fetch original
        return originalFetch.apply(this, args);
    };
*/
    return (
        isLogged() ? (
            <>
                <Header showSettings={showSettings} layoutRef={layoutHeaderRef} />
                <Settings isVisible={isVisible} layoutRef={layoutSettingsRef} clickSettingsButton={clickSettingsButton} />
                <div className='bodyApp'>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 3 }}>
                            <Navigation />
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

export default Layout;