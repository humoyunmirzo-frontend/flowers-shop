module.exports = (sequlize, Sequelize)=>{
    const Order = sequlize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        customer: {
            type: Sequelize.STRING,
            allowNull: false
        },
        region: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING(90),
            allowNull: false
        }
    })
    return Order
}