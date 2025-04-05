import { FileGetDto } from "../../../application/dtos/file/FileGetDto";
import { File } from "../../../domain/entities/File";
import { IFileRepository } from "../../../domain/repositories/IFileRepository";
import { FileModel } from "../models/FileModel";

export class FileRepository implements IFileRepository{

 async findByName(filename: string): Promise<FileGetDto> {
    const find = await FileModel.findOne({ where: { filename } });
    if(!find){
    throw new Error("Arquivo não encontrado");
    }
  return new FileGetDto(find?.id,find?.filename,find?.path,find?.createdAt);
  }
 async getFiles(): Promise<FileGetDto[]> {
    const files = await FileModel.findAll();
   const res = files.map(file => new FileGetDto(
      file.id,
      file.filename,
      file.path,
      file.createdAt
    ))
    return res;
   
  }
 async save(file: File): Promise<void> {
    const exist = await FileModel.create({ filename: file.filename, path: file.path });
    return ;
  }
  async exists(filename: string): Promise<boolean> {
    const file = await FileModel.findOne({ where: { filename } });
    return !!file;
  }
}