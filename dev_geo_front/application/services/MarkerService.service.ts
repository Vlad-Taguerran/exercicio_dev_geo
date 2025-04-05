import { INominatimResponse } from "../interfaces/INominatimResponse ";
import { useLocationStore } from "../stores/Location.store";

const markerService = async (coordinates: [number, number])=>{
    const setLocationStore = useLocationStore.getState().setLocation
  
  try {
    const response = await fetch( `https://nominatim.openstreetmap.org/reverse?lat=${coordinates[1]}&lon=${coordinates[0]}&format=json`);
    const data :INominatimResponse = await response.json();
    const {lat,lon} = {...data};
    const toSet ={...data.address, lat,lon} 
    setLocationStore(toSet);
  } catch (error) {
    console.log(error);
  }
}


export default markerService;