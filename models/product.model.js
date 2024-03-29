module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title:{
            type: Sequelize.STRING(500),
            allowNull: false
        },
        image:{
            type: Sequelize.STRING(10000),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(10000),
            allowNull: false
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return Product
}
