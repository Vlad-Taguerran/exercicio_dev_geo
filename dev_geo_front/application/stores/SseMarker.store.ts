import { create } from "zustand"
import { IAddressDto } from "../interfaces/IAddressDto"


type State = {
  markers: IAddressDto[];
};

type Actions = {
  setMarkers: (data: IAddressDto) => void;
  setMarkersByUser: (data: IAddressDto[]) => void;
  clearMarkers: () => void;
};

export const useMarkers = create<State & Actions>((set) => ({
  markers: [{
    "id": "7acc603c-fb84-47ec-a290-42fa7b1067ec",
    "address": "Rua Apinajés",
    "house_number": "",
    "city": "São Paulo",
    "state": "São Paulo",
    "postcode": "05017-000",
    "latitude": "-23.53388865",
    "longitude": "-46.67718056729651"
}],
  setMarkers: (data: IAddressDto) => {
    set((state) => ({markers: [...state.markers, data]}));
  },  
 
  clearMarkers: () => set({ markers: [] }),
  setMarkersByUser:(data:IAddressDto[])=> set({markers: data})

}));