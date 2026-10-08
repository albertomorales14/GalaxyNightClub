import Skeleton from './Skeleton';

// Muestra un valor o, si todavía no ha llegado, un skeleton en línea
function Valor({ children, cargando, width = '4rem' }) {
    if (cargando) return <Skeleton width={width} height="1em" className="skeleton-inline" />;
    return children;
}

export default Valor;
