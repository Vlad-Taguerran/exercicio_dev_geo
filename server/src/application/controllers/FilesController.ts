import { FilesGetUseCase } from './../useCases/Files/FilesGetUseCase';
import { ProcessFilesUseCase } from "../useCases/Files/FilesProcessUseCase";
import { Request, Response } from "express";
import { CensusDataToDto } from '../dtos/csv/CensusDataToDto';
import { WebSocketInterface } from '../interfaces/WebSocket';
import { CsvReader } from '../../infrastructure/services/ReadData.service';
import { FilesfindByNameUseCase } from '../useCases/Files/FilesfindByNameUseCase';
import path from 'path';
import { IFileRepository } from '../../domain/repositories/IFileRepository';

export class FileController {
  private processFilesUseCase: ProcessFilesUseCase;
  private filesget: FilesGetUseCase;
  private findByName: FilesfindByNameUseCase;
  constructor(
    private fileRepository: IFileRepository,
    private wsServer: WebSocketInterface,
   )
    
    {
    this.processFilesUseCase = new ProcessFilesUseCase(this.fileRepository);
    this.filesget = new FilesGetUseCase(this.fileRepository);
    this.findByName = new FilesfindByNameUseCase(this.fileRepository);
  }

  async processFiles(req: Request, res: Response): Promise<Response> {
    try {
      await this.processFilesUseCase.execute();
      return res.status(200).json({ message: "Arquivos processados com sucesso!" });
    } catch (error) {
      console.error("Erro ao processar arquivos:", error);
      return res.status(500).json({ message: "Erro ao processar arquivos" });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const respose = await this.filesget.execute();
      return res.status(200).json(respose);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao processar arquivos" });
    }
  }

  async getFile(req: Request, res: Response): Promise<Response> {

    try {
      const { filename } = req.params;
      const resFile = await this.findByName.execute(filename)
      const batchSize = 500;
      CsvReader.readCsv<CensusDataToDto>(resFile.filename, CensusDataToDto.fromCsv, this.onBatchProcessed.bind(this), batchSize);
      return res.status(200).send();
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Erro ao processar arquivos" });
    }
  }
  private onBatchProcessed(batch: CensusDataToDto[]): void {
    if (batch.length == 0) {
      // this.wsServer.close();
    }
    this.wsServer.sendMessageToAll(JSON.stringify(batch));
  }
}
