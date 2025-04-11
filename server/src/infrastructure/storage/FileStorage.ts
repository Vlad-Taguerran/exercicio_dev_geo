import fs from 'fs/promises';
import path from 'path';

export class FileStorage {
  private readonly finalPath = path.resolve('files')

  async moveFromTemp(tempPath: string, finalName: string): Promise<string> {
    await fs.mkdir(this.finalPath, { recursive: true })
    const target = path.join(this.finalPath, finalName)
    await fs.rename(tempPath, target)
    return target
  }

  async delete(filePath: string): Promise<void> {
    await fs.unlink(filePath)
  }
}
