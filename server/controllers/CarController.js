const {Car} = require('../models/models')
const ApiError = require('../error/ApiError');

class CarController {
    async create (req, res, next) {
        try {
            const {name} = req.body
            const car = await Car.create({name})
            return res.json(car)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res, next) {
        try {
            const cars = await Car.findAll({ where: {status: 'AVAILABLE'}})
            return res.json(cars)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne (req, res, next) {
        try {
            const {id} = req.params
            const car = await Car.findOne({ where: {id: id}})
            return res.json(car)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CarController()
