"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../../application/controllers/AuthController");
const authRoute = (0, express_1.Router)();
const userController = new AuthController_1.AuthController();
authRoute.post('/auth', (req, res) => { userController.loging(req, res); });
exports.default = authRoute;
