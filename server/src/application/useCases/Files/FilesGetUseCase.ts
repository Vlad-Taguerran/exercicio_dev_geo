import { IFileRepository } from "../../../domain/repositories/IFileRepository";
import { FileGetDto } from "../../dtos/file/FileGetDto";

export class FilesGetUseCase {
  constructor(private fileRepository: IFileRepository) {}
  async execute(): Promise<FileGetDto[]> {
      const files =   await this.fileRepository.getFiles();
      return files;
      }
    
  }