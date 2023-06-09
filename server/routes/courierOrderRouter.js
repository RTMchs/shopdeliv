const Router = require('express')
const router = new Router()
const courierOrderController = require('../controllers/CourierOrderController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, courierOrderController.getAvOrders)
router.get('/current', authMiddleware, courierOrderController.getCurOrders)
router.patch('/:id', authMiddleware, courierOrderController.patchOrder)


module.exports = router

