export interface CensoData {
  total: number;
  sum: number;
  mean: number;
  median: number;
}

export interface ICensoMetric {
  domicilio_coletivo: CensoData,
  domicilio_particular: CensoData,
  agro: CensoData,
  construcao: CensoData,
  ensino: CensoData,
  outras_finalidades: CensoData,
  religioso: CensoData,
  saude: CensoData,
}