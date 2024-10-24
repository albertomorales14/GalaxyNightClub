import React, { Suspense } from 'react';
import SuspenseMejorasPage from './SuspenseMejorasPage';

function MejorasNegocioPage() {

    const LazyMejorasNegocioPage = React.lazy(() => import('./LazyMejorasNegocioPage'));

    return (
        <Suspense fallback={<SuspenseMejorasPage />}>
            <LazyMejorasNegocioPage />
        </Suspense>
    )
}

export default MejorasNegocioPage;