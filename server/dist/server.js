"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const user_routes_1 = __importDefault(require("./infrastructure/http/routes/user.routes"));
const WebSocketServer_1 = require("./infrastructure/websocket/WebSocketServer");
const sequelize_1 = require("./infrastructure/database/sequelize");
const auth_routes_1 = __importDefault(require("./infrastructure/http/routes/auth.routes"));
const address_routes_1 = __importDefault(require("./infrastructure/http/routes/address.routes"));
const sse_routes_1 = __importDefault(require("./infrastructure/http/routes/sse.routes"));
const cors_1 = __importDefault(require("cors"));
const file_routes_1 = __importDefault(require("./infrastructure/http/routes/file.routes"));
const errorHandler_1 = require("./infrastructure/middlewares/errorHandler");
const dataInitializer_1 = require("./infrastructure/start/dataInitializer");
const dataInitializer = new dataInitializer_1.DataInitializer();
const app = (0, express_1.default)();
const wss = new WebSocketServer_1.WebSocketServer(8081);
wss.start();
(0, sequelize_1.connectDB)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/event", sse_routes_1.default);
app.use("/api", user_routes_1.default);
app.use("/api", address_routes_1.default);
app.use('/api', auth_routes_1.default);
app.use('/api', (0, file_routes_1.default)(wss));
dataInitializer.run();
app.use(errorHandler_1.errorHandler);
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`Rota carregada: ${middleware.route.path}`);
    }
});
app.listen(8000, () => console.log("Servidor Ativo"));
