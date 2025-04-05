import { create } from "zustand"

type state ={
  open: boolean
}
type action = {
  changeState: () => void
}

export const useDrawereState = create<state & action>()((set)=>({
  open:false,
  changeState: ()=> set((state)=>({ open: !state.open }))
}))