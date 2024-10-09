import { useState, useEffect } from 'react';
import useAuth from "../auth/useAuth";
import logService from '../Utils/logService';

function Header({ showSettings, layoutRef }) {

    const { user } = useAuth();
    const [club, setClub] = useState([]);
    const [countdown, setCountdown] = useState(10 * 60);
    const [src, setSrc] = useState(user ? `http://localhost:5050/uploads/img/${user.imagen}` : '/img/user/profile-default.png');
    const [ingresosDiarios, setIngresosDiarios] = useState(null);
    const [listaIngresos, setListaIngresos] = useState([]);

    // Contador infinito:se repite cada 10 min: Decrementa la fama del club
    useEffect(() => {
        let timeout;
        if (countdown >= 0) {
            timeout = setTimeout(() => {
                setCountdown(countdown - 1);
                // Cuando quede 1 segundo
                if (countdown <= 1) {
                    fetch(`http://localhost:5050/api/Club/${user.club}`, {
                        method: 'GET',
                        headers: { "Content-type": "application/json; charset=UTF-8", },
                    }).then(response => response.json())
                    .then(data => {
                            setClub(data);
                            console.log('[Club fama] GET llamada a API...');
                            logService.sendLog('info', '[GET] Llamada a la API: Lista de Club (Header.js)');
                        }).catch(error => {
                            console.log('A problem occurred with your fetch operation: ', error);
                            logService.sendLog('error', '[GET] Llamada a la API: Actualizar Club (Header.js): ' + error);
                        });
                }
            }, 1000);
        } else {
            // La cuenta atras ha terminado
            let fame = club?.fama - 25 < 0 ? 0 : club?.fama - 25;
            setIngresosDiarios(
                fame >= 95 ? 30000 : 
                fame >= 80 ? 25000 : 
                fame >= 70 ? 15000 : 
                fame >= 25 ? 10000 : 0
            );
            fetch(`http://localhost:5050/api/Club/${user.club}`, {
                method: 'PUT',
                body: JSON.stringify({
                    fama: fame,
                    visitas: club?.visitas + Math.floor(Math.random() * fame >= 90 ? 150 : fame >= 70 ? 100 : fame >= 25 ? 25 : 2),
                    celebridades: club?.celebridades + Math.floor(Math.random() * fame >= 90 ? 5 : fame >= 70 ? 3 : fame >= 25 ? 2 : 0),
                    caja_fuerte: (club?.ingresos_hoy + club?.caja_fuerte) > 250000 ? 250000 : club?.ingresos_hoy + club?.caja_fuerte,
                    ganancias_club: club?.ganancias_club + club?.ingresos_hoy,
                    publico: fame >= 95 ? 'Hasta los topes'
                           : fame >= 80 ? 'Abarrotado'
                           : fame >= 70 ? 'Lleno'
                           : fame >= 25 ? 'Poca gente' : 'Vacío',
                    ingresos_hoy: fame >= 95 ? 30000
                                : fame >= 80 ? 25000
                                : fame >= 70 ? 15000
                                : fame >= 25 ? 10000 : 0
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
            }).then(response => {
                response.json();
                console.log('[Pérdida de Fama del Club] PUT llamada a API...');
                logService.sendLog('info', '[PUT] Llamada a la API: Pérdida de Fama del Club (Header.js)');
                logService.sendLog('info', 'fama al ' + fame + '%');
                
            }).catch(error => {
                console.log('A problem occurred with your fetch operation: ' + error);
                logService.sendLog('error', '[PUT] Llamada a la API: Actualizar Club (Header.js): ' + error);
            })

            // Vuelve a empezar la cuenta atras
            setCountdown(10 * 60); // 10 minutos 
        }

        return () => clearTimeout(timeout);
    }, [countdown]);

    useEffect(() => {
        setSrc(`http://localhost:5050/uploads/img/${user.imagen}`);
    }, [user]);

    return (
        <div className="header">
            <h3 style={{
                fontSize: 'var(--bs-nav-link-font-size)',
                fontWeight: 'var(--bs-nav-link-font-weight)',
                flex: '1',
                padding: '0 10px',
                alignContent: 'center',
                textShadow: '2px 2px 1px black',
                marginBottom: '0'
            }}>
                Sesión iniciada como: <span style={{ color: 'var(--purple-light)' }}>{user.username}</span>
            </h3>
            <img id="img-header" ref={layoutRef} className="header-img" src={src} alt="user-photo" onClick={showSettings} />
        </div>
    )
}

export default Header;