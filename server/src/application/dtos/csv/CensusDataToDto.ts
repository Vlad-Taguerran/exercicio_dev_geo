import { CensusCsv } from "../../../domain/entities/CensuCsv";

export class CensusDataToDto {
  constructor(
    public latitude: number,
    public longitude: number,
    public censo_2022_estabelecimento_outras_finalidades_poi_counts: number,
    public censo_2022_domicilio_particular_poi_counts: number,
    public censo_2022_estabelecimento_construcao_poi_counts: number,
    public censo_2022_estabelecimento_religioso_poi_counts: number,
    public censo_2022_estabelecimento_ensino_poi_counts: number,
    public censo_2022_estabelecimento_saude_poi_counts: number,
    public censo_2022_domicilio_coletivo_poi_counts: number,
    public censo_2022_estabelecimento_agro_poi_counts: number
  ) {}
  static fromCsv(row: any): CensusDataToDto {
    return new CensusDataToDto(
      parseFloat(row.latitude),
      parseFloat(row.longitude),
      parseInt(row.censo_2022_estabelecimento_outras_finalidades_poi_counts),
      parseInt(row.censo_2022_domicilio_particular_poi_counts),
      parseInt(row.censo_2022_estabelecimento_construcao_poi_counts),
      parseInt(row.censo_2022_estabelecimento_religioso_poi_counts),
      parseInt(row.censo_2022_estabelecimento_ensino_poi_counts),
      parseInt(row.censo_2022_estabelecimento_saude_poi_counts),
      parseInt(row.censo_2022_domicilio_coletivo_poi_counts),
      parseInt(row.censo_2022_estabelecimento_agro_poi_counts)
    );
  }

  toEntity(): CensusCsv {
    return new CensusCsv(
      this.latitude,
      this.longitude,
      this.censo_2022_estabelecimento_outras_finalidades_poi_counts,
      this.censo_2022_domicilio_particular_poi_counts,
      this.censo_2022_estabelecimento_construcao_poi_counts,
      this.censo_2022_estabelecimento_religioso_poi_counts,
      this.censo_2022_estabelecimento_ensino_poi_counts,
      this.censo_2022_estabelecimento_saude_poi_counts,
      this.censo_2022_domicilio_coletivo_poi_counts,
      this.censo_2022_estabelecimento_agro_poi_counts
    );
  }
  
}