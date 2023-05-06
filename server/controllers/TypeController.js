const {Type, Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        try {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete (req, res, next) {
        try {
            const {id} = req.params
            const type = await Type.destroy({
                    where: {id}
                },
            )
            let msg;

            if (type === 1) { msg = 'success' }
            else { msg = 'failed' }

            return res.json(msg)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
        const types = await Type.findAll()
        return res.json(types)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new TypeController()
