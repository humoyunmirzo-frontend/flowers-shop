    module.exports = (sequelize, Sequelize)=>{
        const User = sequelize.define('user', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
              },
              firstName: {
                type: Sequelize.STRING,
                allowNull: false
              },
              lastName: {
                type: Sequelize.STRING,
                allowNull: false
              },
              email: {
                type: Sequelize.STRING(500),
                allowNull: false,
                unique: true
              },
              password: {
                type: Sequelize.STRING(80),
                allowNull: false
              }
        })

        return User
    }