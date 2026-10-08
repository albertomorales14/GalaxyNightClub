import { useEffect, useRef } from 'react';
import useAuth from '../auth/useAuth';
import { clubApi, ingresosApi, productosApi, tecnicosApi } from '../api';
import logService from '../Utils/logService';
import {
    CAJA_FUERTE_MAX, FAMA_PERDIDA_POR_CICLO, aleatorioHasta, ingresosSegunFama,
    maxCelebridadesSegunFama, maxVisitasSegunFama, publicoSegunFama
} from '../game/reglas';

const PRIMER_CICLO_MS = 10 * 1000; // 10 segundos tras iniciar sesión
const INTERVALO_CICLO_MS = 5 * 60 * 1000; // después, cada 5 minutos

// Desplaza los ingresos de la semana un día y añade los de hoy al final
async function actualizarIngresos(ingresosHoy) {
    const ingresos = await ingresosApi.list();
    const nuevosValores = [...ingresos.slice(1).map(ingreso => ingreso.value), ingresosHoy];
    await Promise.all(ingresos.map((ingreso, i) => ingresosApi.update(ingreso._id, { value: nuevosValores[i] })));
}

// Los técnicos asignados producen existencias de su producto. Devuelve las unidades producidas
async function producirProductos() {
    const [tecnicos, productos] = await Promise.all([tecnicosApi.list(), productosApi.list()]);
    let producidas = 0;

    const actualizaciones = tecnicos
        .filter(tecnico => tecnico.producto !== '')
        .map(tecnico => productos.find(producto => producto.name === tecnico.producto))
        .filter(producto => producto && producto.existencias < producto.capacidadMax)
        .map(producto => {
            const existencias = Math.min(
                producto.capacidadMax,
                producto.existencias + aleatorioHasta(producto.capacidadMax / 3)
            );
            producidas += existencias - producto.existencias;
            return productosApi.update(producto._id, {
                existencias,
                diferencia: producto.capacidadMax - existencias
            });
        });

    await Promise.all(actualizaciones);
    return producidas;
}

// Un ciclo del juego: el club pierde fama, cobra los ingresos y los técnicos producen
async function ejecutarCiclo() {
    const club = await clubApi.get();
    const fama = Math.max(club.fama - FAMA_PERDIDA_POR_CICLO, 0);

    await actualizarIngresos(ingresosSegunFama(club.fama));
    const producidas = await producirProductos();

    await clubApi.update({
        fama,
        visitas: club.visitas + aleatorioHasta(maxVisitasSegunFama(fama)),
        celebridades: club.celebridades + aleatorioHasta(maxCelebridadesSegunFama(fama)),
        caja_fuerte: Math.min(club.ingresos_hoy + club.caja_fuerte, CAJA_FUERTE_MAX),
        ganancias_club: club.ganancias_club + club.ingresos_hoy,
        productos_acumulados: club.productos_acumulados + producidas,
        publico: publicoSegunFama(fama),
        ingresos_hoy: ingresosSegunFama(fama)
    });

    logService.sendLog('info', `Ciclo completado: fama del club al ${fama}%`);
}

// Componente sin interfaz que ejecuta el ciclo del juego mientras haya sesión
function Cron() {

    const { user, refreshClub } = useAuth();
    const userId = user?._id; // el ciclo solo se reinicia si cambia el usuario, no al editar su perfil
    const enCurso = useRef(false);

    useEffect(() => {
        if (!userId) return undefined;

        const tick = async () => {
            if (enCurso.current) return; // evita solapar ciclos si uno tarda
            enCurso.current = true;
            try {
                await ejecutarCiclo();
                await refreshClub();
            } catch (error) {
                logService.sendLog('error', 'Error en el ciclo del juego (Cron): ' + error.message);
            } finally {
                enCurso.current = false;
            }
        };

        let intervalo;
        const primerCiclo = setTimeout(() => {
            tick();
            intervalo = setInterval(tick, INTERVALO_CICLO_MS);
        }, PRIMER_CICLO_MS);

        return () => {
            clearTimeout(primerCiclo);
            clearInterval(intervalo);
        };
    }, [userId, refreshClub]);

    return null;
}

export default Cron;
