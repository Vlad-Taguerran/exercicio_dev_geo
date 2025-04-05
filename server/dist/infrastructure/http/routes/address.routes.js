"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const AddressController_1 = require("../../../application/controllers/AddressController");
const addressRoute = (0, express_1.Router)();
const addressController = new AddressController_1.AddressController();
addressRoute.post('/address/:userId', authMiddleware_1.authenticateMiddleware, (req, res) => { addressController.create(req, res); });
exports.default = addressRoute;
