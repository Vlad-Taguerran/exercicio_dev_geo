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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvController = void 0;
class CsvController {
    constructor(ReadCsvUseCase) {
        this.ReadCsvUseCase = ReadCsvUseCase;
    }
    getCensu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const csv = yield this.ReadCsvUseCase.execute();
                return res.json(csv);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao processar CSV" });
            }
        });
    }
}
exports.CsvController = CsvController;
