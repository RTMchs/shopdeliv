const {Rating, Device} = require("../models/models")
const ApiError = require("../error/ApiError");

class RatingController {

    async getAll(req, res, next) {
        try {
            const {id} = req.params
            console.log(id)
            const ratings = await Rating.findAll({
                where: {deviceId: id}
            })
            console.log(ratings)
            return res.json(ratings)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async createRate (req, res, next) {
        try {
            const user = req.user
            const {rate, description, deviceId} = req.body
            // const rating = await Rating.create({
            //     rate: rate,
            //     description: description,
            //     deviceId: deviceId,
            //     userId: user.id
            // })
            const ratings = await Rating.findAndCountAll({
                where: {deviceId: deviceId}
            })
            // return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new RatingController()