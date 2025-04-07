import { create } from "zustand";
import { ICensusPointDto } from "../interfaces/ICensusPointDto";
type state = {
  censu: ICensusPointDto | null
}
type action = {
  setSelectedPoint: (censuData: ICensusPointDto)=>void
}
export const useDrawereData = create<state & action>()((set)=>({
  censu: null,
  setSelectedPoint: (censuData) => set(()=> ({censu: censuData}))
}))