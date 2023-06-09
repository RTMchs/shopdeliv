const Router = require('express')
const router = new Router()

const basketController = require('../controllers/basketController')

// ------- Проверка авторизованного пользователя -------- //
const authMiddleware = require('../middleware/authMiddleware')

// ------- CRUD корзины ------- //
router.get('/', authMiddleware, basketController.getBasketUser)
router.post('/', authMiddleware, basketController.addToBasket)
router.delete('/:id', basketController.deleteFromBasket)
router.delete('/', basketController.clearUserBasket)
router.delete('/delete/:id', basketController.deleteFromAllBaskets)
router.patch('/:id', authMiddleware, basketController.removeFromBasket)

module.exports = router