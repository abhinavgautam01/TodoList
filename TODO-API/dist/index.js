"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const tasks_entity_1 = require("./src/tasks/tasks.entity");
const task_router_1 = require("./src/tasks/task.router");
// Load environment variables
dotenv_1.default.config();
// Instantiate Express app
const app = (0, express_1.default)();
//Parse.rquest.body
app.use(body_parser_1.default.json());
//Use cors
app.use((0, cors_1.default)());
// // Create Database Connection for MongoDB
// export const AppDataSource = new DataSource({
//     type: 'mongodb',
//     host: process.env.MONGO_HOST,
//     port: Number(process.env.MONGO_PORT),
//     database: process.env.MONGO_DB,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     entities: [Task],
//     synchronize: true,
// });
// // Define server port
// const port = process.env.PORT || 3200;
// // Initialize Database Connection
// AppDataSource.initialize()
//     .then(async () => {
//         console.log('MongoDB connection established successfully!');
//         app.listen(port, () => {
//             console.log(`Server is running on http://localhost:${port}`);
//         });
//     })
//     .catch((err) => {
//         console.error('Error During Data Source Initialization:', err);
//     });
// app.use('/', tasksRouter)
// Create Database Connection for MariaDB
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mariadb",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "todo_db",
    synchronize: true, // Set to false in production
    logging: true,
    entities: [tasks_entity_1.Task], // Adjust entity path based on your structure
});
// Define server port
const port = process.env.PORT || 3200;
// Initialize Database Connection
exports.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("MariaDB connection established successfully!");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}))
    .catch((err) => {
    console.error("Error During Data Source Initialization:", err);
});
// Use routes
app.use("/", task_router_1.tasksRouter);
