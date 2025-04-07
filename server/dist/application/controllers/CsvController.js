"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvController = void 0;
class CsvController {
    constructor(ReadCsvUseCase, fileToUpdate) {
        this.ReadCsvUseCase = ReadCsvUseCase;
        this.fileToUpdate = fileToUpdate;
    }
    async getCensu(req, res) {
        try {
            const response = await this.ReadCsvUseCase.execute();
            return res.json(response);
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao processar CSV" });
        }
    }
    async updateFile(req, res) {
        const file = req.file; // multer adiciona `req.file`
        if (!file) {
            return res.status(400).json({ error: "Arquivo não encontrado." });
        }
        try {
            await this.fileToUpdate.execute(file.filename, file.path);
            return res.status(200).json({ message: "Arquivo salvo com sucesso!" });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.CsvController = CsvController;
