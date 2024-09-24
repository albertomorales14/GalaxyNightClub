import useAuth from "../auth/useAuth";
import { useState, useEffect } from 'react';

export default function Header({ showSettings }) {

    const { user, logout } = useAuth();
    const [club, setClub] = useState([]);
    const [countdown, setCountdown] = useState(10);
    const [fame, setFame] = useState(null);

    useEffect(() => {
        let timeout;
        if (countdown >= 0) {
            timeout = setTimeout(() => {
                setCountdown(countdown - 1);
                if (countdown <= 5) {
                    fetch(`http://localhost:5050/api/Club/${user.club}`, {
                        method: 'GET',
                        headers: { "Content-type": "application/json; charset=UTF-8", },
                    })
                        .then(response => response.json())
                        .then(data => {
                            // Handle the fetched data here
                            setClub(data)
                            setFame(data?.fama)
                            console.log('[Club fama] GET llamada a API...')
                        })
                        .catch(error => {
                            // Handle any errors
                            console.log('A problem occurred with your fetch operation: ', error)
                        });
                }
            }, 1000);
        } else {
            fetch(`http://localhost:5050/api/Club/${user.club}`, {
                method: 'PUT',
                body: JSON.stringify({
                    fama: club?.fama - 25 < 0 ? 0 : club?.fama - 25,
                    visitas: club?.visitas + Math.floor(Math.random() * club?.fama >= 90 ? 150 : club?.fama >= 70 ? 100 : club?.fama >= 30 ? 25 : 2),
                    celebridades: club?.celebridades + Math.floor(Math.random() * club?.fama >= 90 ? 5 : club?.fama >= 70 ? 3 : club?.fama >= 30 ? 2 : 0),
                    caja_fuerte: (club?.ingresos_hoy + club?.caja_fuerte) > 250000 ? 250000 : club?.ingresos_hoy + club?.caja_fuerte,
                    ganancias_club: club?.ganancias_club + club?.ingresos_hoy,
                    publico: club?.fama >= 95 ? 'Hasta los topes' 
                            : club?.fama >= 80 ? 'Abarrotado' 
                            : club?.fama >= 70 ? 'Lleno' 
                            : club?.fama >= 30 ? 'Poca gente' : 'Vacío',
                    ingresos_hoy: club?.fama >= 95 ? 30000 
                            : club?.fama >= 80 ? 25000 
                            : club?.fama >= 70 ? 15000 
                            : club?.fama >= 30 ? 10000 : 0
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
            }).then(response => response.json())
                .catch((error) => console.log(error))

            setCountdown(5 * 60);
        }

        return () => clearTimeout(timeout);
    }, [countdown, fame]);

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
            <img id="img-header" className="header-img" src="/img/profile-img-1.png" alt="user-photo" onClick={showSettings} />
        </div>
    )
}