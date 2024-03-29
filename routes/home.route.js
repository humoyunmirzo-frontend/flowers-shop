const {Router} = require('express')
const { getSingleProductAndPage, getUserInterfaceAndProducts } = require('../controllers/product.controller')

const router = Router()

router.get('/', getUserInterfaceAndProducts)
router.get('/products/:id', getSingleProductAndPage)

module.exports = router