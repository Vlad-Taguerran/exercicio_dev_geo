
import fs from "fs";
import Papa from "papaparse";
export class CsvValidator {
  async validate(filePath: string): Promise<boolean> {
    const content = fs.readFileSync(filePath, "utf-8");

    const delimitersToTry = [",", ";", "\t"];
    for (const delimiter of delimitersToTry) {
      const { data, errors } = Papa.parse(content, {
        delimiter,
        header: true,
        skipEmptyLines: true,
      });

      if (errors.length === 0) {
        const headers = Object.keys(data[0] || {});
        const hasLat = headers.includes("latitude");
        const hasLon = headers.includes("longitude");
        const hasKeywords = headers.some((h) =>
          ["casa", "agro"].some((kw) => h.toLowerCase().includes(kw))
        );

        if (hasLat && hasLon && hasKeywords) {
          return true;
        }
      }
    }

    return false;
  }
}