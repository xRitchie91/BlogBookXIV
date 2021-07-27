const { Sequelize } = require("sequelize");
require('dotenv').config();

// creates connection to database, pass in MySQL information 
//module.exports = sequelize;
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize('tech_blog', 'root', 'xTitan91!', {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;