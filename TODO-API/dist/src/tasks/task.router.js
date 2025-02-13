"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const tasks_controller_1 = require("./tasks.controller");
const tasks_validator_1 = require("./tasks.validator");
// import { validationResult } from "express-validator";
exports.tasksRouter = (0, express_1.Router)();
exports.tasksRouter.get('/tasks', (req, res) => {
    tasks_controller_1.taskController.getAll(req, res);
});
//@ts-ignore
exports.tasksRouter.post('/tasks', tasks_validator_1.createValidator, tasks_controller_1.taskController.create);
//@ts-ignore
exports.tasksRouter.put('/tasks', tasks_validator_1.updateValidator, tasks_controller_1.taskController.update);
