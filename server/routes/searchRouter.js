const Router = require('express')
const router = new Router()
const searchController = require('../controllers/SearchController')

router.get('/',  searchController.getSearched)

module.exports = router