import fs from "fs";
import path from "path";

export class FileSystemService {
  static getCsvFiles(directory: string): string[] {
   try {
    const folderPath = path.resolve(directory);
    return fs.readdirSync(folderPath).filter(file => file.endsWith(".csv"));
   } catch (error: any) {
    throw new Error(error.message);
   }
  }
}
