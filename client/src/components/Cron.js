import { useState, useEffect } from 'react';
import useAuth from "../auth/useAuth";
import logService from '../Utils/logService';
import PRODUCTO from '../Utils/namesProductos';

function Cron() {

    const { user, club, getClub } = useAuth();
    const [countdown, setCountdown] = useState(10);
    const [ingresosDiarios, setIngresosDiarios] = useState(null);
    const [listaIngresos, setListaIngresos] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [productos, setProductos] = useState([]);

    // Contador infinito: Decrementa la fama del club
    useEffect(() => {
        let timeout;
        if (user) {

            if (countdown >= 0) {
                timeout = setTimeout(() => {
                    setCountdown(countdown - 1);
                    // Cuando quede 1 segundo
                    if (countdown <= 1) {
                        getClub('Cron.js');
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

                // Actualizar productos
                getTecnicos();
                filtrarTecnicosProductos();
                getProductos();
                actualizarProductos();

                // Actualizar club
                actualizarClub(user?.club, fame, club);

                // Vuelve a empezar la cuenta atras
                setCountdown(60 * 5);
            }
        }

        return () => clearTimeout(timeout);
    }, [countdown, club]);

    const getIngresos = async () => {
        if (user) {
            await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Ingresos/Club/${user?.club}`)
                .then(response => response.json())
                .then(data => {
                    setListaIngresos(data);
                    logService.sendLog('info', '[GET Request] getIngresos: Lista de Ingresos (Cron.js)');
                })
                .catch(error => {
                    logService.sendLog('error', 'Error [GET Request] getIngresos: Lista de Ingresos (Cron.js): ' + error);
                });
        }
    }

    async function actualizarIngresos(ingresosDiariosActualizados) {
        if (user) {
            for (let i = listaIngresos.length - 1; i >= 0; i--) {
                if (i > 0) {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Ingresos/${listaIngresos[i - 1]?._id}`, {
                            method: 'PUT',
                            body: JSON.stringify({
                                value: listaIngresos[i]?.value
                            }),
                            headers: { "Content-type": "application/json; charset=UTF-8", }
                        });

                        if (response.ok) {
                            response.json();
                            logService.sendLog('info', '[PUT Request] Actualizar Ingreso (' + i + ') (Cron.js)');
                        } else {
                            logService.sendLog('error', 'Error: [PUT Request] Actualizar Ingreso (Cron.js)');
                        }
                    } catch (error) {
                        logService.sendLog('error', 'Error: [PUT Request] Actualizar Ingreso (Cron.js): ' + error);
                    }
                } else {
                    try {
                        // Espera a que la solicitud PUT se complete antes de continuar con la siguiente
                        const response = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Ingresos/${listaIngresos[listaIngresos.length - 1]?._id}`, {
                            method: 'PUT',
                            body: JSON.stringify({
                                value: ingresosDiariosActualizados
                            }),
                            headers: { "Content-type": "application/json; charset=UTF-8", }
                        });

                        if (response.ok) {
                            response.json();
                            logService.sendLog('info', '[PUT Request] Actualizar Ingreso Actual de Hoy (' + listaIngresos.length - 1 + ') (Cron.js)');
                        } else {
                            logService.sendLog('error', 'Error: [PUT Request] Actualizar Ingreso Actual de Hoy (Cron.js)');
                        }
                    } catch (error) {
                        logService.sendLog('error', 'Error: [PUT Request] Actualizar Ingreso (Cron.js): ' + error);
                    }
                }
            }
        }
    }

    async function actualizarClub(id, fame, club) {
        if (user) {
            await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Club/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    fama: fame,
                    visitas: club?.visitas + Math.floor(Math.random() * fame === 100 ? 150 : fame >= 75 ? 100 : fame >= 50 ? 25 : fame >= 25 ? 25 : 2),
                    celebridades: club?.celebridades + Math.floor(Math.random() * fame === 100 ? 5 : fame >= 70 ? 3 : fame >= 50 ? 2 : fame >= 25 ? 25 : 0),
                    caja_fuerte: (club?.ingresos_hoy + club?.caja_fuerte) > 250000 ? 250000 : club?.ingresos_hoy + club?.caja_fuerte,
                    ganancias_club: club?.ganancias_club + club?.ingresos_hoy,
                    productos_acumulados: club?.productos_acumulados + productos?.reduce((a, b) => a + (b['existencias'] || 0), 0),
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
                logService.sendLog('info', '[PUT Request] Pérdida de Fama del Club (Cron.js)');
                logService.sendLog('info', '\t> Fama del club al ' + fame + '%');
                getClub('Cron.js');
            }).catch(error => {
                logService.sendLog('error', 'Error: [PUT Request] Actualizar Fama del club Club (Cron.js): ' + error);
            })
        }
    }

    async function getTecnicos() {
        if (user) {
            await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Tecnicos/Club/${user?.club}`)
                .then(response => response.json())
                .then(data => {
                    setTecnicos(data);
                    logService.sendLog('info', '[GET Request] Lista de Tecnicos obtenida (Cron.js)');
                })
                .catch(error => {
                    logService.sendLog('error', 'Error: [GET Request] Obtener lista de Tecnicos (Cron.js): ' + error);
                })
        }
    }

    async function getProductos() {
        if (user) {
            await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Productos/Club/${user?.club}`)
                .then(response => response.json())
                .then(data => {
                    setProductos(data);
                    logService.sendLog('info', '[GET Request] Lista de Productos obtenida (Cron.js)');
                })
                .catch(error => {
                    logService.sendLog('error', 'Error: [GET Request] Obtener lista de Productos (Cron.js): ' + error);
                })
        }
    }

    async function filtrarTecnicosProductos() {
        if (user) {
            try {
                const tecnicosFiltrados = tecnicos.filter(tec => tec.producto !== "");
                setTecnicos(tecnicosFiltrados);
                logService.sendLog('info', '\t> Lista de tecnicos filtrada (Cron.js)');
                logService.sendLog('info', '\t> Tecnicos asignados: ' + tecnicosFiltrados.length + ' (Cron.js)');
            } catch (error) {
                logService.sendLog('error', '\t> Error al filtrar lista de tecnicos (Cron.js): ' + error);
            }
        }
    }

    async function actualizarProductos() {
        if (user) {
            try {
                if (tecnicos.length !== 0 || tecnicos) {
                    for (let item of tecnicos) {
                        if (item || item.length !== 0) {
                            let producto_id;
                            let num_producto;
                            switch (item?.producto) {
                                case PRODUCTO.MERCANCIA:
                                    producto_id = productos[0]?._id;
                                    num_producto = 0;
                                    break;
                                case PRODUCTO.CAZA:
                                    producto_id = productos[1]?._id;
                                    num_producto = 1;
                                    break;
                                case PRODUCTO.LATAM:
                                    producto_id = productos[2]?._id;
                                    num_producto = 2;
                                    break;
                                case PRODUCTO.FARMACEUTICA:
                                    producto_id = productos[3]?._id;
                                    num_producto = 3;
                                    break;
                                case PRODUCTO.ORGANIC:
                                    producto_id = productos[4]?._id;
                                    num_producto = 4;
                                    break;
                                case PRODUCTO.FOTOCOPIAS:
                                    producto_id = productos[5]?._id;
                                    num_producto = 5;
                                    break;
                                case PRODUCTO.BILLETES:
                                    producto_id = productos[6]?._id;
                                    num_producto = 6;
                                    break;
                                default:
                                    break;
                            }

                            let existencias = (productos[num_producto]?.existencias + (1 * (Math.floor(Math.random() * productos[num_producto]?.capacidadMax / 3)))) >= productos[num_producto]?.capacidadMax ? productos[num_producto]?.capacidadMax : productos[num_producto]?.existencias + (1 * (Math.floor(Math.random() * productos[num_producto]?.capacidadMax / 3)));
                            if (existencias > productos[num_producto]?.capacidadMax) {
                                existencias = productos[num_producto]?.capacidadMax;
                            }
                            let diff = (productos[num_producto]?.capacidadMax - existencias) < 0 ? 0 : productos[num_producto]?.capacidadMax - existencias;
                            
                            if (producto_id.length !== 0 || producto_id) {
                                if (productos[num_producto]?.capacidadMax !== productos[num_producto]?.existencias) {
                                    await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Productos/${producto_id}`, {
                                        method: 'PUT',
                                        body: JSON.stringify({
                                            existencias: existencias,
                                            diferencia: diff
                                        }),
                                        headers: { "Content-type": "application/json; charset=UTF-8", },
                                    }).then(response => {
                                        response.json();
                                        logService.sendLog('info', '[PUT Request] Actualizar Producto (Cron.js)');
                                        logService.sendLog('info', '\t> Técnico actualizando producto: ' + productos[num_producto]?.name + ' (Cron.js)');
                                    }).catch(error => {
                                        logService.sendLog('error', 'Error [PUT Request] Actualizar Producto (Cron.js): ' + error);
                                    })
                                }
                            }
                        }
                    }
                }

            } catch (error) {
                logService.sendLog('error', 'actualizarProductos: Error al actualizar Producto (Cron.js): ' + error);
            }
        }
    }

    return (<></>);
}

export default Cron;