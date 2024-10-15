import { useState, useEffect } from 'react';
import useAuth from "../auth/useAuth";
import logService from '../Utils/logService';

function Header({ showSettings, layoutRef }) {

    const { user, club, getClub } = useAuth();
    const [countdown, setCountdown] = useState(10);
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
                    getClub('Header.js');
                }
            }, 1000);
        } else {
            // La cuenta atras ha terminado
            let fame = club?.fama - 25 < 0 ? 0 : club?.fama - 25;
            let ingresosDiariosActualizados = club?.fama === 100 ? 30000 :
                                              club?.fama >= 75 ? 25000 :
                                              club?.fama >= 50 ? 15000 :
                                              club?.fama >= 25 ? 10000 : 0;
            setIngresosDiarios(ingresosDiariosActualizados);
            // Actualizar ingresos
            getIngresos();
            actualizarIngresos(ingresosDiariosActualizados);

            // Actualizar club
            actualizarClub(user?.club, fame, club);

            // Vuelve a empezar la cuenta atras
            setCountdown(30); // 1 minutos 
        }

        return () => clearTimeout(timeout);
    }, [countdown, club]);

    const getIngresos = async () => {
        await fetch(`http://localhost:5050/api/Ingresos/Club/${user?.club}`)
            .then(response => response.json())
            .then(data => {
                setListaIngresos(data);
                logService.sendLog('info', '[GET Request] getIngresos: Lista de Ingresos (Header.js)');
            })
            .catch(error => {
                logService.sendLog('error', 'Error [GET Request] getIngresos: Lista de Ingresos (Header.js): ' + error);
            });
    }

    const updateIngreso = async (id, value, i) => {
        await fetch(`http://localhost:5050/api/Ingresos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                value: value
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => {
            response.json();
            logService.sendLog('info', '[PUT Request] Actualizar Ingreso (' + i + ') (Header.js)');
        }).catch(error => {
            logService.sendLog('error', 'Error: [PUT Request] Actualizar Ingreso (Header.js): ' + error);
        })
    }

    async function actualizarIngresos(ingresosDiariosActualizados) {
        for (let i = listaIngresos.length - 1; i >= 0; i--) {
            if (i > 0) {
                try {
                    const response = await fetch(`http://localhost:5050/api/Ingresos/${listaIngresos[i - 1]?._id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            value: listaIngresos[i]?.value
                        }),
                        headers: { "Content-type": "application/json; charset=UTF-8", }
                    });

                    if (response.ok) {
                        response.json();
                        logService.sendLog('info', '[PUT Request] Actualizar Ingreso (' + i + ') (Header.js)');
                    } else {
                        logService.sendLog('error', 'Error: [PUT Request] Actualizar Ingreso (Header.js)');
                    }
                } catch (error) {
                    logService.sendLog('error', 'Error: [PUT Request] Actualizar Ingreso (Header.js): ' + error);
                }
            } else {
                try {
                    // Espera a que la solicitud PUT se complete antes de continuar con la siguiente
                    const response = await fetch(`http://localhost:5050/api/Ingresos/${listaIngresos[listaIngresos.length - 1]?._id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            value: ingresosDiariosActualizados
                        }),
                        headers: { "Content-type": "application/json; charset=UTF-8", }
                    });

                    if (response.ok) {
                        response.json();
                        logService.sendLog('info', '[PUT Request] Actualizar Ingreso Actual de Hoy (' + listaIngresos.length - 1 + ') (Header.js)');
                    } else {
                        logService.sendLog('error', 'Error: [PUT Request] Actualizar Ingreso Actual de Hoy (Header.js)');
                    }
                } catch (error) {
                    logService.sendLog('error', 'Error: [PUT Request] Actualizar Ingreso (Header.js): ' + error);
                }
            }
        }
    }

    async function actualizarClub(id, fame, club) {
        await fetch(`http://localhost:5050/api/Club/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                fama: fame,
                visitas: club?.visitas + Math.floor(Math.random() * fame === 100 ? 150 : fame >= 75 ? 100 : fame >= 50 ? 25 : fame >= 25 ? 25 : 2),
                celebridades: club?.celebridades + Math.floor(Math.random() * fame === 100 ? 5 : fame >= 70 ? 3 : fame >= 50 ? 2 : fame >= 25 ? 25 : 0),
                caja_fuerte: (club?.ingresos_hoy + club?.caja_fuerte) > 250000 ? 250000 : club?.ingresos_hoy + club?.caja_fuerte,
                ganancias_club: club?.ganancias_club + club?.ingresos_hoy,
                publico: fame === 100 ? 'Hasta los topes'
                       : fame >= 75 ? 'Abarrotado'
                       : fame >= 50 ? 'Lleno'
                       : fame >= 25 ? 'Poca gente' : 'Vacío',
                ingresos_hoy: fame === 100 ? 30000
                            : fame >= 75 ? 25000
                            : fame >= 50 ? 15000
                            : fame >= 25 ? 10000 : 0
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => {
            response.json();
            logService.sendLog('info', '[PUT Request] Pérdida de Fama del Club (Header.js)');
            logService.sendLog('info', '\t> Fama del club al ' + fame + '%');
            getClub('Header.js');
        }).catch(error => {
            logService.sendLog('error', 'Error: [PUT Request] Actualizar Fama del club Club (Header.js): ' + error);
        })
    }

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
                {countdown} Sesión iniciada como: <span style={{ color: 'var(--purple-light)' }}>{user.username}</span>
            </h3>
            <img id="img-header" ref={layoutRef} className="header-img" src={src} alt="user-photo" onClick={showSettings} />
        </div>
    )
}

export default Header;