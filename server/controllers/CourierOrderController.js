const {Order, Car} = require("../models/models");
const ApiError = require("../error/ApiError");

class CourierOrderController {
    async getAvOrders(req, res, next) {
        try {
            const order = await Order.findAll({
                where: {status: 'PREPARING'},
            })
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getCurOrders(req, res, next) {
        try {
            const {id} = req.user
            const order = await Order.findAll({
                where: {status: 'DELIVERING', courierId: id},
            })
            console.log(order)
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async patchOrder(req, res, next) {
        try {
            const userId = req.user.id
            const {id} = req.params
            const {status} = req.body
            const tryorder = await Order.findOne({
                    where:{id: id}
                })
            if (tryorder.courierId === userId || !tryorder.courierId) {
            const order = await Order.update(
                {status: status, courierId: userId},
                {
                    where: {id: id}
                })
                return res.json(order)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new CourierOrderController()