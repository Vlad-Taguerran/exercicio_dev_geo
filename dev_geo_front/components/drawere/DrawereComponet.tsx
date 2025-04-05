'use client'
import { Drawer } from "@mui/material"
import DrawereData from "./DrawereData";
import { useMapActions } from "@/application/stores/MapActions.store";

const DrawerComponent = () =>{
  const {drawerState,changeDrawereState} = useMapActions();
  return(
    <Drawer open={drawerState} onClose={changeDrawereState}>
      <DrawereData/>
    </Drawer>
  )
};

export default DrawerComponent;