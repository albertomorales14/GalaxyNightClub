// Ventas por colecciones: cada comprador pide un grupo de productos. Para el producto en la
// posición n de la lista pide su capacidad reducida un n%, y la colección solo se puede
// vender cuando todos sus productos tienen existencias suficientes.

const reducir = (cantidad, numero) => Math.round(cantidad - cantidad * numero / 100);

// Capacidad que pide el comprador para el producto n
export const capacidadColeccion = (productos, numero) =>
    reducir(productos[numero]?.capacidadMax ?? 0, numero);

// Existencias del producto n que entran en la venta
export const existenciasColeccion = (productos, numero) => {
    const existencias = productos[numero]?.existencias ?? 0;
    return Math.min(existencias, reducir(existencias, numero));
};

export const coleccionCompleta = (productos, grupo) =>
    grupo.every(numero => existenciasColeccion(productos, numero) >= capacidadColeccion(productos, numero));

// Precio de venta de la colección
export const precioColeccion = (productos, grupo) => grupo.reduce((total, numero) => {
    const producto = productos[numero];
    if (!producto?.capacidadMax) return total;
    const capacidad = capacidadColeccion(productos, numero);
    const valorTotal = producto.totalValue * capacidad / producto.capacidadMax;
    return total + (capacidad ? existenciasColeccion(productos, numero) / capacidad * valorTotal : 0);
}, 0);

// Genera `cantidad` números distintos entre 0 y max
const numerosUnicos = (cantidad, max) => {
    const numeros = new Set();
    while (numeros.size < cantidad) {
        numeros.add(Math.floor(Math.random() * (max + 1)));
    }
    return [...numeros];
};

// Tres colecciones de tres productos al azar
export const generarColecciones = (numProductos = 7) =>
    Array.from({ length: 3 }, () => numerosUnicos(3, numProductos - 1));
