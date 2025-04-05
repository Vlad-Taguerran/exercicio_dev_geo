import { create } from "zustand";
import { ICensoMetric } from "../interfaces/ICensoMetric";

interface state {
  data: ICensoMetric;
  metricStat: boolean
 
}
interface action {
  setMetric: (newData: Partial<ICensoMetric>) => void;
  changeMetricState: ()=>void
}

export const useCensoStore = create<state & action>((set) => ({
  metricStat: false,
  data: {
    censo_2022_domicilio_coletivo_poi_counts: { total: 0, sum: 0, mean: 0, median: 0 },
    censo_2022_domicilio_particular_poi_counts: { total: 0, sum: 0, mean: 0, median: 0 },
    censo_2022_estabelecimento_agro_poi_counts: { total: 0, sum: 0, mean: 0, median: 0 },
    censo_2022_estabelecimento_construcao_poi_counts: { total: 0, sum: 0, mean: 0, median: 0 },
    censo_2022_estabelecimento_ensino_poi_counts: { total: 0, sum: 0, mean: 0, median: 0 },
    censo_2022_estabelecimento_outras_finalidades_poi_counts: { total: 0, sum: 0, mean: 0, median: 0 },
    censo_2022_estabelecimento_religioso_poi_counts: { total: 0, sum: 0, mean: 0, median: 0 },
    censo_2022_estabelecimento_saude_poi_counts: { total: 0, sum: 0, mean: 0, median: 0 },
  },
  setMetric: (newData) => set((state) => ({
    data: { ...state.data, ...newData }
  })),
  changeMetricState:  ()=> set((state)=>({ metricStat: !state.metricStat }))
}));
