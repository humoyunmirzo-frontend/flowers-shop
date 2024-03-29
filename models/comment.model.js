module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comment', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        })
    return Comment
}