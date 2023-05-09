const {Rating, Device} = require("../models/models")
const ApiError = require("../error/ApiError");

class RatingController {

    async getAll(req, res, next) {
        try {
            const {id} = req.params
            const {userId} = req.query
            if (userId) {
                const rating = await Rating.findOne({
                    where: {deviceId: id, userId: userId}
                })
                return res.json(rating)
            }
            const ratings = await Rating.findAll({
                where: {deviceId: id}
            })
            return res.json(ratings)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createRate(req, res, next) {
        try {
            const user = req.user
            const {rate, description, deviceId} = req.body
            const check = await Rating.findOne({
                where: {userId: user.id, deviceId: deviceId}
            })
            if (check){
                return res.json({message: 'Вы уже оставили отзыв об этом товаре'})
            } else {
                const rating = await Rating.create({
                    rate: rate,
                    description: description,
                    deviceId: deviceId,
                    userId: user.id
                })
                const ratings = await Rating.findAndCountAll({
                    where: {deviceId: deviceId}
                })
                if (ratings.count > 0) {
                    const dev = ratings.rows
                    let sum = 0
                    dev.map(d => sum += d.rate)
                    const avg = (sum / ratings.count).toFixed(1)
                    const device = Device.update({rating: avg},
                        {
                            where: {id: deviceId}
                        }
                    )
                }
                return res.json(rating)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new RatingController()