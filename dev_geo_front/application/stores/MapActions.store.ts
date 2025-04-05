import { create } from "zustand"

type state = {
  polygonState:  boolean,
  pinMapState: boolean,
  drawerState: boolean,
  mapInstance: mapboxgl.Map | null;
}
type action = {
  changePolygonState: () => void
  changePinMapState: () => void
  changeDrawereState: () => void
  setMapInstance: (map: mapboxgl.Map | null) => void;
}

export const useMapActions = create<state & action>()((set)=>({
  polygonState: false,
  pinMapState: false,
  drawerState: false,
  mapInstance: null, 
  changePinMapState: ()=> set((state)=>({pinMapState : !state.pinMapState})),
  changePolygonState: ()=> set((state)=>({polygonState: !state.polygonState})),
  changeDrawereState:()=> set((state)=>({drawerState: !state.drawerState})),
  setMapInstance: (map) => set({ mapInstance: map }),
}))