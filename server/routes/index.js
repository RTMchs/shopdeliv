const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')
const orderDeviceRouter = require('./orderDevicesRouter')
const ratingRouter = require('./ratingRouter')
const searchRouter = require('./searchRouter')
const courierOrderRouter = require('./courierOrderRouter')
const carRouter = require('./carRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)
router.use('/ordevice', orderDeviceRouter)
router.use('/rating', ratingRouter)
router.use('/search', searchRouter)
router.use('/courierorder', courierOrderRouter)
router.use('/car', carRouter)

module.exports = router
