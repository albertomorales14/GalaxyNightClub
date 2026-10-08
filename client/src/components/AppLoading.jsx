import { useEffect, useState } from 'react';
import { ring } from 'ldrs';

ring.register('layout-ldr');

const AVISO_TRAS_MS = 4000;

// Pantalla de carga inicial. El servidor gratuito de Render se duerme tras un rato sin
// visitas y tarda hasta un minuto en arrancar: si la espera se alarga, se explica al usuario.
function AppLoading() {

    const [lento, setLento] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLento(true), AVISO_TRAS_MS);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="app-loading" role="status" aria-live="polite">
            <layout-ldr color="var(--purple-light)" size="60" stroke="6"></layout-ldr>
            {lento && (
                <p>
                    Despertando el servidor del club...<br />
                    La primera visita tras un rato de inactividad puede tardar hasta un minuto.
                </p>
            )}
        </div>
    );
}

export default AppLoading;
