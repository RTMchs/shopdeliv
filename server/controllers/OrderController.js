const {Order, OrderDevice} = require("../models/models")
const ApiError = require("../error/ApiError");

class OrderController {

    async createOrder(req, res, next) {
        try {
            const {userId, first_name, last_name, middle_name, address} = req.body
            const order = await Order.create({
                userId: userId,
                first_name: first_name,
                last_name: last_name,
                middle_name: middle_name,
                address: address
            })
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrdersPreparing(req, res, next) {
        try {
            const order = await Order.findAll({
                where: {status: 'PREPARING'},
                order: [
                    ['id', 'DESC']
                ]
            })
            console.log(order)
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrdersDelivering(req, res, next) {
        try {
            const order = await Order.findAll({
                where: {status: 'DELIVERING'},
                order: [
                    ['id', 'DESC']
                ]
            })
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrdersEnded(req, res, next) {
        try {
            const order = await Order.findAll({
                where: {status: 'ENDED'},
                order: [
                    ['id', 'DESC']
                ]
            })
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrdersUser(req, res, next) {
        try {
            const {id} = req.user
                const order = await Order.findAll({
                    where: {userId: id},
                    order: [
                        ['id', 'DESC']
                    ]
                })
                return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrderDevices(req, res, next) {
        try {
            const {id} = req.params
            const order = await OrderDevice.findAll({
            where: {orderId: id}
            })
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const {id} = req.params
            const order = await OrderDevice.destroy({where: {device: id}})
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }



}

module.exports = new OrderController()