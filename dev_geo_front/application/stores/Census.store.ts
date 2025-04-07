import { create } from "zustand";
import { ICensusPoint } from "../interfaces/ICensusPoint"

type state = {
  censusCsv: ICensusPoint[];
}
type action = {
    setData: (data: ICensusPoint[]) => void;
}

export const useCensuStore = create<state & action>((set)=>({
  censusCsv: [],
  setData: (data)=> set((state)=>({
    
    censusCsv: [...state.censusCsv, ...data]
  }))
}))