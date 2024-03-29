const {Router} = require('express')
const { getAdminDashboard, getProductsPage, createProduct, deleteProduct, getProductById, updateProduct } = require('../controllers/product.controller')
const router = Router()
const upload = require('../utils/fileUpload')
const {protected, guest} = require('../middlewares/auth')

router.get('/dashboard',protected, getAdminDashboard)
router.get('/dashboard/products',protected, getProductsPage)
router.post('/products/create-product', upload.single('image'),protected, createProduct)
router.get('/products/:id',protected, getProductById)
router.post('/products/update/:id',upload.single('image'),protected, updateProduct)
router.post('/products/delete/:id',protected, deleteProduct)
module.exports = router