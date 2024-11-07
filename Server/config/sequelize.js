const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_DIALECT:', process.env.DB_DIALECT);
const sequelize = new Sequelize(
    process.env.DB_NAME,      
    process.env.DB_USER,     
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST, 
        dialect: process.env.DB_DIALECT, 
        port: process.env.DB_PORT,
        logging: console.log, 
        define: {
            timestamps: false,    
        },
        pool: {
            max: 5,               
            min: 0,               
            acquire: 30000,      
            idle: 10000,     
        },
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;
