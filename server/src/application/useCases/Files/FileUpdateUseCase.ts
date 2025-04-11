import { CsvValidator } from "../../../domain/entities/filesCsv/CsvValidator";
import { IFileRepository } from "../../../domain/repositories/IFileRepository";
import { FileStorage } from "../../../infrastructure/storage/FileStorage";
import { File } from "../../../domain/entities/File";
export class FileUpdate {
  constructor(private fileRepository: IFileRepository,private readonly validator: CsvValidator) {}
  async execute( file: Express.Multer.File) {
    const storage = new FileStorage();
    try {
      await this.validator.validate(file.path);
    
    const toSave =  new File(file.filename,file.path);
    storage.moveFromTemp(file.path,file.filename);
    return await this.fileRepository.save(toSave);
    } catch (error) {
      console.log(error)
    }
  }
  }