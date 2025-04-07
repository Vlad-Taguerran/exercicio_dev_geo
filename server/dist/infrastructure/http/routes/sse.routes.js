"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SSEController_1 = require("../../controller/SSEController");
const sseRouter = (0, express_1.Router)();
sseRouter.get('/address', (req, res) => SSEController_1.sseController.connect(req, res));
exports.default = sseRouter;
