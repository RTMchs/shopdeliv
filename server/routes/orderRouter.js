const Router = require('express')
const router = new Router()

const OrderController = require('../controllers/OrderController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, OrderController.getOrdersUser)
router.get('/:id', authMiddleware, OrderController.getOrderDevices)
router.post('/', authMiddleware, OrderController.createOrder)
// router.patch('/', authMiddleware, OrderController.setAddress)
router.delete('/:id', authMiddleware, OrderController.deleteOrder)


module.exports = router