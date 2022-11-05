import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    synchronize: true,
    charset: 'utf8mb4',
    entities: [
        "src/models/**/*.ts"
    ],
    database: "homee",
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
export { AppDataSource };