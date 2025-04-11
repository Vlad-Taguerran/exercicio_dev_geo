import { useDrawereData } from "@/application/stores/DrawereData";
import { Box, List, ListItemText } from "@mui/material";

const DrawereData = ()=>{
  const {censu} = useDrawereData();
  return(
    <Box sx={{width: 250}} role="presentation" >
      <List>
        <ListItemText primary={` 🏠 Particulares: ${censu?.domicilio_particular}`}/>
        <ListItemText primary={` 🏢 Coletivos: ${censu?.domicilio_coletivo}`}/>
        <ListItemText primary={` 🏗️ Construção: ${censu?.construcao}`}/>
        <ListItemText primary={` 🏫 Ensino: ${censu?.ensino}`}/>
        <ListItemText primary={` ⛪ Religioso: ${censu?.religioso}`}/>
        <ListItemText primary={` 🏥 Saúde: ${censu?.saude}`}/>
        <ListItemText primary={` 🌱 Agro: ${censu?.agro}`}/>
       
      </List>
    </Box>
  );
}
export default DrawereData;