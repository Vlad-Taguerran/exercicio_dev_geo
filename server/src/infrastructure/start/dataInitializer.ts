import { FileRepository } from './../database/repositories/FileRepository';
import path from "path";
import { FILES_DIRECTORY } from "../config/FilesConfigure";
import { FileSystemService } from "../filesystem/FileSystem";
import { logError, logInfo, logSuccess } from "../config/logHelpers";
import { File } from '../../domain/entities/File';

export class DataInitializer {
  private fileRepository = new FileRepository();
  constructor(){}
  async run() {
     try {
        const files = FileSystemService.getCsvFiles(FILES_DIRECTORY);
    
        for (const filename of files) {
          const filePath = path.join(FILES_DIRECTORY, filename);
          const exists = await this.fileRepository.exists(filename);
    
          if (!exists) {
            await this.fileRepository.save(new File(filename, filePath));
           logInfo(`📂 Arquivo registrado: ${filename}`);
          } else {
            logSuccess(`✅ Arquivo já registrado: ${filename}`);
          }
        }
       } catch (error) {
        logError('Erro ao buscar arquivos no diretorio',error)
       }
  }
}