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

    // async setAddress(req, res, next) {
    //     try {
    //         const {address, userId} = req.body
    //         const or = await Order.findAll(
    //             {where: {userId: userId},
    //                 order: [
    //                     ['id', 'DESC']
    //                 ],
    //                 limit:1
    //             })
    //         const orderId = or[0].dataValues.id
    //
    //         const order = await Order.update(
    //             {address: address},
    //             {
    //                 where: {id: orderId}
    //             })
    //         return res.json(order)
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message))
    //     }
    // }

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