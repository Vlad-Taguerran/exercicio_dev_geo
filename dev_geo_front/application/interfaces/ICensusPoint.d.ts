export interface ICensusPoint {
    latitude: number;
    longitude: number;
    outras_finalidades: number;
    domicilio_particular: number;
    construcao: number;
    religioso: number;
    ensino: number;
    saude: number;
    domicilio_coletivo: number;
    agro: number;
    [key: string]: never;
}