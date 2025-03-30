import fs from 'fs';
import {parse} from 'csv-parse'


export class CsvReader{

  static async  readCsv<T>(filePath: string, mapRow: (row: any)=> any,onBatchProcessed: (batch: T[]) => void, batchSize: number = 100 ) : Promise<T[]>{
    const delimiter = await this.detectTypeSeparator(filePath)
    let batch: any[] = [];
    let lineCount = 0;

    return new Promise((resolve, rejects)=>{
      

      fs.createReadStream(filePath).pipe(parse({delimiter: delimiter, columns: true, trim: true}))
      .on("data",(row)=>{
        batch.push(mapRow(row));
        lineCount++;
        if(batch.length == batchSize){
          onBatchProcessed([...batch]); 
          batch = [];
        }
        
      })
      .on("end",()=> {
        if(batch.length > 0){
          onBatchProcessed([...batch]);
        }
        onBatchProcessed([]);
      })
      .on("error",(err)=>rejects(err.message));
    })
  }

  private static detectTypeSeparator(filePath:string): Promise<string>{
    const separators = [',', '\t', ';'];
    try {
      return new Promise<string>((resolve, reject) => {
         fs.createReadStream(filePath,{ encoding: 'utf8', start: 0, end: 500 })
        .on('data',(chunk)=>{
          const line = chunk.toString().split('\n')[0];

          const separator = separators.find((sep) => line.includes(sep));

          if(separator){
            resolve(separator);
          }else{
            resolve(';');
          }
          
        })
        .on('error',(error)=>reject(error.message));
      })
    } catch (error) {
      throw new Error("Erro ao ler CSV");
    }
  }

}
