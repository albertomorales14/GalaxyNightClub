const clubController = {}

const Club = require('../model/Club')

clubController.getClub = async (request, response) => {
    const club = await Club.find()
    response.json(club)
}

clubController.getMyClub = async(request, response) => {
    const club = await Club.findById(request.params.id)
    response.json(club)
}

clubController.updateClub = async (request, response) => {
    const { fama,
        propietario,
        ubicacion,
        ganancias_almacen,
        ganancias_club,
        ganancias_totales,
        trabajos,
        ventas_almacen,
        celebridades,
        publico,
        visitas,
        ingresos_hoy,
        caja_fuerte,
        productos_vendidos } = request.body;
    await Club.findByIdAndUpdate(request.params.id, {
        fama,
        propietario,
        ubicacion,
        ganancias_almacen,
        ganancias_club,
        ganancias_totales,
        trabajos,
        ventas_almacen,
        celebridades,
        publico,
        visitas,
        ingresos_hoy,
        caja_fuerte,
        productos_vendidos
    })
    response.json({
        message: 'Club actualizado'
    })
}

clubController.updateFameClub = async (request, response) => {
    const { fama, trabajos } = request.body;
    await Club.findByIdAndUpdate(request.params.id, { fama, trabajos })
    response.json({
        message: 'Fama actualizado'
    })
}

/* Añadir validaciones de campos con try-catch con modulos de express */

module.exports = clubController;