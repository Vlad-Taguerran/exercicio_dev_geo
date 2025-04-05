import DrawerComponent from "@/components/drawere/DrawereComponet";
import LocationForm from "@/components/forms/LocationForm";
import { Map } from "@/components/map/Map";
import ModalComponet from "@/components/modal/ModalComponet";


export default function Home() {
 
  return (
   <>
   <ModalComponet/>
  <Map/>
  <LocationForm/>
  <DrawerComponent/>
   </>
  );
}
