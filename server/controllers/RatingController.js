const {Rating} = require("../models/models")
const ApiError = require("../error/ApiError");

class RatingController {

    async getAll(req, res, next) {
        try {
            const {id} = req.params
            const ratings = await Rating.findAll({
                where: {deviceId: id}
            })
            return res.json(ratings)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async createRate (req, res, next) {
        try {
            const user = req.user
            const {rate, description, deviceId} = req.body
            const rating = await Rating.create({
                rate: rate,
                description: description,
                deviceId: deviceId,
                userId: user.id
            })
            return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new RatingController()