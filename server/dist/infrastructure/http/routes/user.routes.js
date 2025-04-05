"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../../../application/controllers/UserController");
const userRoutes = (0, express_1.Router)();
const userController = new UserController_1.UserController();
userRoutes.post("/user", (req, res) => { userController.create(req, res); });
userRoutes.get('/user', (req, res) => {
    res.json({ message: 'User route is working' });
});
exports.default = userRoutes;
