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
    domicilio_coletivo: { total: 0, sum: 0, mean: 0, median: 0 },
    domicilio_particular: { total: 0, sum: 0, mean: 0, median: 0 },
    agro: { total: 0, sum: 0, mean: 0, median: 0 },
    construcao: { total: 0, sum: 0, mean: 0, median: 0 },
    ensino: { total: 0, sum: 0, mean: 0, median: 0 },
    outras_finalidades: { total: 0, sum: 0, mean: 0, median: 0 },
    religioso: { total: 0, sum: 0, mean: 0, median: 0 },
    saude: { total: 0, sum: 0, mean: 0, median: 0 },
  },
  setMetric: (newData) => set((state) => ({
    data: { ...state.data, ...newData }
  })),
  changeMetricState:  ()=> set((state)=>({ metricStat: !state.metricStat }))
}));
