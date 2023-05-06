const Router = require('express')
const router = new Router()

const delBasketController = require('../controllers/DelBasketController')
const authMiddleware = require('../middleware/authMiddleware')

// ------- CRUD корзины ------- //
router.delete('/:id', authMiddleware, delBasketController.deleteFromAllBaskets)
router.get('/', authMiddleware, delBasketController.getDevices)

module.exports = router