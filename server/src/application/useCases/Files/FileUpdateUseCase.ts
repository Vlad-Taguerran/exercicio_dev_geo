import { CsvValidator } from "../../../domain/entities/filesCsv/CsvValidator";
import { IFileRepository } from "../../../domain/repositories/IFileRepository";
import { FileStorage } from "../../../infrastructure/storage/FileStorage";
import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { File } from "../../../domain/entities/File";
export class FileUpdate {
  constructor(private fileRepository: IFileRepository,private readonly validator: CsvValidator) {}
  async execute( filename:string, path:string) {
    const isValid = await this.validator.validate(path);
    if (!isValid) {
      await fs.unlink(path);
      throw new Error("CSV inválido. Verifique os títulos das colunas.");
    }
    
    const file =new File(filename, path);
    await this.fileRepository.save(file);
  }
  }