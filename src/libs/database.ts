import { Sequelize } from "sequelize";

// MySQL connection
const sequelizeConnection = new Sequelize(process.env.DATABASE as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

export { sequelizeConnection }