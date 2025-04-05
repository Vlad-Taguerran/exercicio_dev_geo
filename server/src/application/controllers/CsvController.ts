import { ReadCsvUseCase } from '../useCases/csv/ReadCsvUseCase';
import { Request, Response } from "express";
export class CsvController{
  constructor(private readonly ReadCsvUseCase: ReadCsvUseCase){}

  async getCensu(req: Request, res: Response ){
    try {
      const response = await this.ReadCsvUseCase.execute();
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao processar CSV" });
    }
  }
}