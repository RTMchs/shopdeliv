const {Device, BasketDevice, Basket} = require("../models/models")
const ApiError = require("../error/ApiError");

class BasketController {
    // ------ CRUD корзины ------ //

    async addToBasket(req, res, next) {
        try {
            const user = req.user
            const {deviceId} = req.body
            const find = await BasketDevice.findOne({where: {basketId: user.id, deviceId: deviceId}})
            if (!find) {
                const basket = await BasketDevice.create({basketId: user.id, deviceId: deviceId})
                return res.json(basket)
            } else {
                const count = find.amount + 1;
                const basket = await BasketDevice.update(
                    {amount: count},
                    {
                        where: {basketId: user.id, deviceId: deviceId}
                    })
                return res.json(basket)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeFromBasket(req, res, next) {
        try {
            const {id} = req.params
            const find = await BasketDevice.findOne({where: {id: id}})
            const count = find.amount - 1;
            const basket = await BasketDevice.update(
                {amount: count},
                {
                    where: {id: id}
                })
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async clearUserBasket(req, res, next) {
        try {
            const {userId} = req.query
            const basket = await BasketDevice.destroy(
                {
                    where: {basketId: userId}
                })
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteFromBasket(req, res, next) {
        try {
            const {id} = req.params
            const type = await BasketDevice.destroy(
                {
                    where: {id: id}
                })
            if (type === 1) {
                return res.json('Товар был удалён из корзины')
            } else {
                return res.json('Невозможно удалить товар')
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasketUser(req, res) {
        const {id} = req.user
        const basket = await BasketDevice.findAll({
            include: {
                model: Device
            }, where: {basketId: id}
        })

        return res.json(basket)
    }

}

module.exports = new BasketController()