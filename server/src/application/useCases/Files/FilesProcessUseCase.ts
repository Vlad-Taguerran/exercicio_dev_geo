
import path from 'path';
import { IFileRepository } from '../../../domain/repositories/IFileRepository';
import { FileSystemService } from '../../../infrastructure/filesystem/FileSystem';
import { File } from '../../../domain/entities/File';
import { FILES_DIRECTORY } from '../../../infrastructure/config/FilesConfigure';
import { logError, logInfo, logSuccess } from '../../../infrastructure/config/logHelpers';
export class ProcessFilesUseCase {
  constructor(private fileRepository: IFileRepository) {}

  async execute(): Promise<void> {
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
    logError('Erro ao buscar arquivos no diretorio')
   }
  }
}
