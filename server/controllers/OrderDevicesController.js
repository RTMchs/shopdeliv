const {OrderDevice, Order} = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderDevicesController {

    async addToOrder(req, res, next) {
        try {
            const {orderId, deviceId, amount} = req.body
            console.log(orderId, deviceId, amount)
            const order = await OrderDevice.create({orderId: orderId, deviceId: deviceId, amount: amount})
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async findOrderById(req, res, next) {
        try {
            const {id} = req.params
            console.log(id)
            const order = await Order.findOne({where: {id: id}})
            console.log(order)
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async findOneOrder(req, res, next) {
        try {
            const {id} = req.user
            const order = await Order.findAll({
                where: {userId: id},
                order: [
                    ['id', 'DESC']
                ], limit: 1
            })
            return res.json(order[0])
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrderDevicesController()