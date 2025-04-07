"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CensusDataToDto = void 0;
const CensuCsv_1 = require("../../../domain/entities/CensuCsv");
class CensusDataToDto {
    constructor(latitude, longitude, censo_2022_estabelecimento_outras_finalidades_poi_counts, censo_2022_domicilio_particular_poi_counts, censo_2022_estabelecimento_construcao_poi_counts, censo_2022_estabelecimento_religioso_poi_counts, censo_2022_estabelecimento_ensino_poi_counts, censo_2022_estabelecimento_saude_poi_counts, censo_2022_domicilio_coletivo_poi_counts, censo_2022_estabelecimento_agro_poi_counts) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.censo_2022_estabelecimento_outras_finalidades_poi_counts = censo_2022_estabelecimento_outras_finalidades_poi_counts;
        this.censo_2022_domicilio_particular_poi_counts = censo_2022_domicilio_particular_poi_counts;
        this.censo_2022_estabelecimento_construcao_poi_counts = censo_2022_estabelecimento_construcao_poi_counts;
        this.censo_2022_estabelecimento_religioso_poi_counts = censo_2022_estabelecimento_religioso_poi_counts;
        this.censo_2022_estabelecimento_ensino_poi_counts = censo_2022_estabelecimento_ensino_poi_counts;
        this.censo_2022_estabelecimento_saude_poi_counts = censo_2022_estabelecimento_saude_poi_counts;
        this.censo_2022_domicilio_coletivo_poi_counts = censo_2022_domicilio_coletivo_poi_counts;
        this.censo_2022_estabelecimento_agro_poi_counts = censo_2022_estabelecimento_agro_poi_counts;
    }
    static fromCsv(row) {
        return new CensusDataToDto(parseFloat(row.latitude), parseFloat(row.longitude), parseInt(row.censo_2022_estabelecimento_outras_finalidades_poi_counts), parseInt(row.censo_2022_domicilio_particular_poi_counts), parseInt(row.censo_2022_estabelecimento_construcao_poi_counts), parseInt(row.censo_2022_estabelecimento_religioso_poi_counts), parseInt(row.censo_2022_estabelecimento_ensino_poi_counts), parseInt(row.censo_2022_estabelecimento_saude_poi_counts), parseInt(row.censo_2022_domicilio_coletivo_poi_counts), parseInt(row.censo_2022_estabelecimento_agro_poi_counts));
    }
    toEntity() {
        return new CensuCsv_1.CensusCsv(this.latitude, this.longitude, this.censo_2022_estabelecimento_outras_finalidades_poi_counts, this.censo_2022_domicilio_particular_poi_counts, this.censo_2022_estabelecimento_construcao_poi_counts, this.censo_2022_estabelecimento_religioso_poi_counts, this.censo_2022_estabelecimento_ensino_poi_counts, this.censo_2022_estabelecimento_saude_poi_counts, this.censo_2022_domicilio_coletivo_poi_counts, this.censo_2022_estabelecimento_agro_poi_counts);
    }
}
exports.CensusDataToDto = CensusDataToDto;
