import path from "path";
import fs from "fs";

export const FILES_DIRECTORY = path.resolve(__dirname, "..", "..", "..", "files");

/*if (!fs.existsSync(FILES_DIRECTORY)) {
  fs.mkdirSync(FILES_DIRECTORY, { recursive: true });
  console.log(`📂 Pasta criada: ${FILES_DIRECTORY}`);
}
*/