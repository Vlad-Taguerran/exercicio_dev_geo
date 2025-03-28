"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_routes_1 = __importDefault(require("./infrastructure/http/routes/User-routes"));
const Csv_routes_1 = __importDefault(require("./infrastructure/http/routes/Csv-routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("api/", User_routes_1.default);
app.use("api/", Csv_routes_1.default);
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`Rota carregada: ${middleware.route.path}`);
    }
});
app.listen(3000, () => console.log("Servidor Ativo"));
