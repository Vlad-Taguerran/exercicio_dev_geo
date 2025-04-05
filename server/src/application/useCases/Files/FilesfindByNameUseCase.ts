import { IFileRepository } from "../../../domain/repositories/IFileRepository";
import { FileGetDto } from "../../dtos/file/FileGetDto";

export class FilesfindByNameUseCase {
  constructor(private fileRepository: IFileRepository) {}
  async execute(filename:string): Promise<FileGetDto> {
      const files =   await this.fileRepository.findByName(filename);
      return files;
      }
    
  }