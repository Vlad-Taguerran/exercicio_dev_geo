import { CensusCsv } from "../../../domain/entities/CensuCsv";
import { CsvReader } from "../../../infrastructure/services/ReadData.service";
import { CensusDataToDto } from "../../dtos/csv/CensusDataToDto";
import { WebSocketInterface } from "../../interfaces/WebSocket";

export class ReadCsvUseCase{
  constructor(private readonly filePath: string,private wsServer: WebSocketInterface){}

  async execute(){
    try {
      const batchSize = 500;
      CsvReader.readCsv<CensusDataToDto>(this.filePath, CensusDataToDto.fromCsv,this.onBatchProcessed.bind(this),batchSize);
    
    } catch (error) {
      
    } finally{
      return {"message" : "Reading csv"}
    }
   }
  private onBatchProcessed(batch: CensusDataToDto[]): void {
    if(batch.length == 0 ){
     // this.wsServer.close();
    }
    this.wsServer.sendMessageToAll(JSON.stringify(batch));
}
}