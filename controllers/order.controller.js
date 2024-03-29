const db = require('../models/index')
const Order = db.order

// get orders page
const getOrdersAndPage = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: ['product'],
            raw: false,
            plain:false,
            nest: true
        })
        let totalActiveOrdersSum 
let totalDeliveredOrdersSum
let totalRevenue
let totalSoldProductsQuantity
        if (orders){
        function totalAmountForStatus(orders, status) {
            let totalAmount = 0;
            orders.forEach(order => {
              if (order.status === status) {
                totalAmount += order.product.amount;
              }
            });
            return totalAmount;
          }
           totalActiveOrdersSum = totalAmountForStatus(orders, 'active')
           totalDeliveredOrdersSum = totalAmountForStatus(orders, 'delivered')
           totalRevenue = orders.reduce((acc, curr) => acc + curr.product.amount, 0)
           totalSoldProductsQuantity = ()=> {
            let count = 0;
            orders.forEach(order => {
              if (order.status === 'delivered') {
                count += 1
              }
            });
            return count;
          }
          } else {
             totalActiveOrdersSum  = 0
             totalDeliveredOrdersSum = 0
             totalRevenue = 0
             totalSoldProductsQuantity = 0
          }
        res.render('admin-panel/orders', {
            title: "Orders",
            orders,
            totalRevenue,
            totalDeliveredOrdersSum,
            totalActiveOrdersSum,
            totalSoldProductsQuantity
        })
    } catch (error) {
        console.log(error);
    }
}




// create order
const createOrder = async (req, res) => {
    try {
        const { customer, region, phone, productId } = req.body
        await Order.create(
            {
                customer, region, phone, productId, status: 'active'
            }
        )
        res.send('<h1>Your order sent successfully! Our staff will connect with you soon! <a href="/">Home page</a> </h1>')
    } catch (error) {
        console.log(error);
    }
}

// update order
const updateOrderStatus = async (req, res) => {
    try {
        const status = req.body.status
        await Order.update({ status }, { where: { id: req.params.id } })
        res.redirect('/order/dashboard/orders')
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createOrder,
    getOrdersAndPage,
    updateOrderStatus

}