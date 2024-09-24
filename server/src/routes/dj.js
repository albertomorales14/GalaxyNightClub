const {Router} = require('express')
const router = Router()

const { getDJs, updateDJ } = require('../controller/djController')

router.route('/')

    .get(getDJs)

router.route('/:id')

    .put(updateDJ)

module.exports = router;