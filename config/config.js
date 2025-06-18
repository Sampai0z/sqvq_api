require("dotenv").config();

const config = {
  development: {
    username: "root",
    password: "",
    database: "sqvq",
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT || 3306,
    dialect: "mysql",
  },
};

module.exports = config;
