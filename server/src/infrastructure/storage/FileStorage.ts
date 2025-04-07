import fs from 'fs/promises';
import path from 'path';

export class FileStorage {
  private uploadPath = path.resolve("files");

  async save(file: Express.Multer.File) {
    await fs.mkdir(this.uploadPath, { recursive: true });
    const targetPath = path.join(this.uploadPath, file.originalname);
    await fs.rename(file.path, targetPath);
  }
}
