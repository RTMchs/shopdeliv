const ApiError = require('../error/ApiError');
const Sequelize = require('sequelize');
const {Device} = require("../models/models");

const Op = Sequelize.Op;
class SearchController {

    async getSearched(req, res, next) {
        try {
            let {value} = req.query
            value = value.toLowerCase()
            const devices = await Device.findAll({
                where: Sequelize.where(
                    Sequelize.fn('lower', Sequelize.col('name')),
                    {
                        [Op.substring] : value
                    }
                )
            })
            return res.json(devices)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new SearchController()
