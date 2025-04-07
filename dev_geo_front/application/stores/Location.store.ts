import { create } from "zustand"
import { IAddress } from "../interfaces/IAddress"

type state = {
  location: IAddress | null,
  modalState: boolean
}
type action = {
  setLocation:(data:IAddress)=>void
  changeModalState: ()=>void
  reset: ()=>void
}

export const useLocationStore = create<state & action>()((set)=>({
  location: null,
  modalState: false,
  setLocation: (data) => set(()=>({location: data, modalState:true})),
  changeModalState: ()=> set((state)=>({modalState: !state.modalState})),
  reset: ()=>({location:null})
}))