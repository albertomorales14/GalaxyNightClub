import { useEffect, useState, useRef } from 'react';
import AppLoading from '../AppLoading';
import Cron from '../Cron';
import Header from '../Header';
import Settings from './settings/Settings';
import Navigation from '../Navigation';
import LoginPage from '../../views/LoginPage';
import useAuth from '../../auth/useAuth';

function Layout({ children }) {

    const { isLogged, loading } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const clickSettingsButton = () => setIsVisible(false);
    const layoutSettingsRef = useRef(null); // Referencia para el layout Settings
    const layoutHeaderRef = useRef(null); // Referencia para el layout Header

    // Oculta el menú de opciones al hacer clic fuera de él
    useEffect(() => {
        if (!isVisible) return undefined;

        const handleClickOutside = (event) => {
            if (layoutSettingsRef.current && layoutHeaderRef.current &&
                !layoutSettingsRef.current.contains(event.target) &&
                !layoutHeaderRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isVisible]);

    const showSettings = () => {
        setIsVisible(!isVisible);
    }

    // Mientras se comprueba si hay una sesión abierta
    if (loading) return <AppLoading />;

    if (!isLogged) return <LoginPage />;

    return (
        <>
            <Cron />
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
    )
}

export default Layout;
