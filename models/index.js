const Sequelize = require('sequelize')

const sequelize = new Sequelize('flower_shop', 'postgres', 'humoyun5020', {
    host:'localhost',
    dialect:'postgres'
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.product = require('./product.model')(sequelize, Sequelize)
db.user = require('./user.model')(sequelize, Sequelize)
db.order = require('./order.model')(sequelize, Sequelize)
db.comment = require('./comment.model')(sequelize, Sequelize)


db.product.hasMany(db.comment, {
    as:'comments',
    constraints: true,
    foreignKey: 'productId'
})
db.comment.belongsTo(db.product,{
    foreignKey:'productId',
    as:'comment'
})
db.product.hasMany(db.order, {
    as: 'products',
    constraints: true
})

db.order.belongsTo(db.product, {
    foreignKey:'productId',
    as: 'product'
})
module.exports = db
