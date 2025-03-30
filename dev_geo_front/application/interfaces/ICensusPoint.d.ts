export interface ICensusPoint {
    latitude: number;
    longitude: number;
    censo_2022_estabelecimento_outras_finalidades_poi_counts: number;
    censo_2022_domicilio_particular_poi_counts: number;
    censo_2022_estabelecimento_construcao_poi_counts: number;
    censo_2022_estabelecimento_religioso_poi_counts: number;
    censo_2022_estabelecimento_ensino_poi_counts: number;
    censo_2022_estabelecimento_saude_poi_counts: number;
    censo_2022_domicilio_coletivo_poi_counts: number;
    censo_2022_estabelecimento_agro_poi_counts: number;
    [key: string]: never;
}