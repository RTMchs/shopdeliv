const Router = require('express')
const router = new Router()

const OrderController = require('../controllers/OrderController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, OrderController.getOrdersUser)
router.get('/last', authMiddleware, OrderController.getLastOrder)
router.get('/preparing', authMiddleware, OrderController.getOrdersPreparing)
router.get('/delivering', authMiddleware, OrderController.getOrdersDelivering)
router.get('/ended', authMiddleware, OrderController.getOrdersEnded)
router.get('/:id', authMiddleware, OrderController.getOrderDevices)
router.post('/', authMiddleware,  OrderController.createOrder)

router.delete('/:id', OrderController.deleteOrder)


module.exports = router