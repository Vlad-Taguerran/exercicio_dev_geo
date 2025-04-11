import { FileUpdate } from './../useCases/Files/FileUpdateUseCase';
import { ReadCsvUseCase } from '../useCases/csv/ReadCsvUseCase';
import { Request, Response } from "express";
export class CsvController{
  constructor(private readonly ReadCsvUseCase: ReadCsvUseCase, private readonly fileToUpdate :FileUpdate){}

  async getCensu(req: Request, res: Response ){
    try {
      const response = await this.ReadCsvUseCase.execute();
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao processar CSV" });
    }
  }
  async updateFile(req: Request, res: Response ){
    const file = req.file; // multer adiciona `req.file`
    if (!file) {
      return res.status(400).json({ error: "Arquivo não encontrado." });
    }

    try {
      await this.fileToUpdate.execute(file);

      return res.status(200).json({ message: "Arquivo salvo com sucesso!" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}