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
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const user_routes_1 = __importDefault(require("./infrastructure/http/routes/user.routes"));
const csv_routes_1 = __importDefault(require("./infrastructure/http/routes/csv.routes"));
const WebSocketServer_1 = require("./infrastructure/websocket/WebSocketServer");
const sequelize_1 = require("./infrastructure/database/sequelize");
const auth_routes_1 = __importDefault(require("./infrastructure/http/routes/auth.routes"));
const address_routes_1 = __importDefault(require("./infrastructure/http/routes/address.routes"));
const sse_routes_1 = __importDefault(require("./infrastructure/http/routes/sse.routes"));
const cors_1 = __importDefault(require("cors"));
const file_routes_1 = __importDefault(require("./infrastructure/http/routes/file.routes"));
const FileRepository_1 = require("./infrastructure/database/repositories/FileRepository");
const FilesProcessUseCase_1 = require("./application/useCases/Files/FilesProcessUseCase");
const filePath = "../files";
const app = (0, express_1.default)();
const wss = new WebSocketServer_1.WebSocketServer(8081);
sequelize_1.connectDB;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/event", sse_routes_1.default);
app.use("/api", user_routes_1.default);
app.use("/api", address_routes_1.default);
app.use("/api", (0, csv_routes_1.default)(wss));
app.use('/api', auth_routes_1.default);
app.use('/api', (0, file_routes_1.default)(wss));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const fileRepo = new FileRepository_1.FileRepository();
    const processFilesUseCase = new FilesProcessUseCase_1.ProcessFilesUseCase(fileRepo);
    yield processFilesUseCase.execute(filePath);
}))();
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`Rota carregada: ${middleware.route.path}`);
    }
});
app.listen(8000, () => console.log("Servidor Ativo"));
