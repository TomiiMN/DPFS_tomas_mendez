const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('techbox', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado a MySQL con Sequelize con éxito');
    } catch (e) {
        console.error('Error de conexión: ', e);
    }
})();

module.exports = sequelize;
