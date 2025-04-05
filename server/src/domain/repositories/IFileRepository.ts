import { FileGetDto } from "../../application/dtos/file/FileGetDto";
import { FileModel } from "../../infrastructure/database/models/FileModel";
import { File } from "../entities/File";

export interface IFileRepository {
  save(file: File): Promise<void>;
  exists(filename: string): Promise<boolean>;
  getFiles(): Promise<FileGetDto[]>;
  findByName(filename: string): Promise<FileGetDto>;
}
