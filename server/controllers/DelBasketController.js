const {BasketDevice} = require("../models/models")
const ApiError = require("../error/ApiError");

class DelBasketController {

    async deleteFromAllBaskets(req, res, next) {
        try {
            const {id} = req.params
            const type = await BasketDevice.destroy(
                {
                    where: {deviceId: id}
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

    async getDevices(req, res, next) {
        try {
            const {basketId} = req.query
            const basket = await BasketDevice.findAll(
                {
                    where: {basketId: basketId}
                })
            console.log(basket)
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new DelBasketController()