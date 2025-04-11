import { CensusCsv } from "../../../domain/entities/CensuCsv";

export class CensusDataToDto {
  constructor(
    public latitude: number,
    public longitude: number,
    public outras_finalidades: number,  // renomeado
    public domicilio_particular: number, // renomeado
    public construcao: number,           // renomeado
    public religioso: number,            // renomeado
    public ensino: number,               // renomeado
    public saude: number,                // renomeado
    public domicilio_coletivo: number,   // renomeado
    public agro: number                  // renomeado
  ) {}
  
  static fromCsv(row: any): CensusDataToDto | null {
    const keywords: Record<string, string> = {
      outras_finalidades: "outras_finalidades",
      domicilio_particular: "domicilio_particular",
      construcao: "construcao",
      religioso: "religioso",
      ensino: "ensino",
      saude: "saude",
      domicilio_coletivo: "domicilio_coletivo",
      agro: "agro"
    };
  
    const renamed: Record<string, any> = {
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
    };
  
    if (isNaN(renamed.latitude) || isNaN(renamed.longitude)) return null;
  
    // Loop pelas colunas do CSV
    for (const key in row) {
      for (const keyword in keywords) {
        if (key.includes(keyword)) {
          renamed[keyword] = parseInt(row[key]);
          break;
        }
      }
    }
  
    const lat = parseFloat(renamed.latitude);
    const lng = parseFloat(renamed.longitude);
    if (isNaN(lat) || isNaN(lng)) return null;
  
    return new CensusDataToDto(
      lat,
      lng,
      parseInt(renamed.outras_finalidades),
      parseInt(renamed.domicilio_particular),
      parseInt(renamed.construcao),
      parseInt(renamed.religioso),
      parseInt(renamed.ensino),
      parseInt(renamed.saude),
      parseInt(renamed.domicilio_coletivo),
      parseInt(renamed.agro)
    );
  }
  
  toEntity(): CensusCsv {
    // Supondo que você também atualize o objeto que representa a entidade para os novos nomes:
    return new CensusCsv(
      this.latitude,
      this.longitude,
      this.outras_finalidades,
      this.domicilio_particular,
      this.construcao,
      this.religioso,
      this.ensino,
      this.saude,
      this.domicilio_coletivo,
      this.agro
    );
  }
}
