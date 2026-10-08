import { lazy, Suspense } from 'react';
import SuspenseMejorasPage from './SuspenseMejorasPage';

// Se define fuera del componente: si se crea en cada render, React lo vuelve a montar cada vez
const LazyMejorasNegocioPage = lazy(() => import('./LazyMejorasNegocioPage'));

function MejorasNegocioPage() {
    return (
        <Suspense fallback={<SuspenseMejorasPage />}>
            <LazyMejorasNegocioPage />
        </Suspense>
    )
}

export default MejorasNegocioPage;
