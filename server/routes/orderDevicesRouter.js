const Router = require('express')
const router = new Router()

const OrderDevicesController = require('../controllers/OrderDevicesController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, OrderDevicesController.addToOrder)
router.get('/', authMiddleware, OrderDevicesController.findOneOrder)
router.get('/:id', authMiddleware, OrderDevicesController.findOrderById)

module.exports = router
