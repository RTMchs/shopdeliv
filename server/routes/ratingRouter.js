const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/RatingController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, ratingController.createRate)
router.get('/:id', ratingController.getAll)

module.exports = router
