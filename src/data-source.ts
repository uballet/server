import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import path = require("path")

const entities = path.join(__dirname, '../dist/entity/*.js')
const migrations = path.join(__dirname, '../dist/migration/*.js')
const subscribers = path.join(__dirname, '../dist/subscriber/*.js')

console.log({ entities })

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 15432,
    username: "postgres",
    password: "postgres",
    database: "uballet",
    synchronize: false,
    logging: false,
    migrationsRun: true,
    migrationsTransactionMode: 'each',
    entities: [entities],
    migrations: [migrations],
    subscribers: [subscribers],
})
