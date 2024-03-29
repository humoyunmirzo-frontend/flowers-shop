const {Router} = require('express')
const {  getOrderById, createOrder, getOrdersAndPage, updateOrderStatus } = require('../controllers/order.controller')

const router = Router()
const upload = require('../utils/fileUpload')
const {protected, guest} = require('../middlewares/auth')

router.get('/dashboard/orders',protected, getOrdersAndPage)
// router.get('/dashboard/orders', getAllOrder
router.post('/create-order',createOrder)
router.post('/update/:id',protected, updateOrderStatus)

module.exports = router