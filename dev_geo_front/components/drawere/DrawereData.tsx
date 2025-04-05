import { useDrawereData } from "@/application/stores/DrawereData";
import { Box, List, ListItemText } from "@mui/material";

const DrawereData = ()=>{
  const {censu} = useDrawereData();
  return(
    <Box sx={{width: 250}} role="presentation" >
      <List>
        <ListItemText primary={` 🏠 Particulares: ${censu?.censo_2022_domicilio_particular_poi_counts}`}/>
        <ListItemText primary={` 🏢 Coletivos: ${censu?.censo_2022_domicilio_coletivo_poi_counts}`}/>
        <ListItemText primary={` 🏗️ Construção: ${censu?.censo_2022_estabelecimento_construcao_poi_counts}`}/>
        <ListItemText primary={` 🏫 Ensino: ${censu?.censo_2022_estabelecimento_ensino_poi_counts}`}/>
        <ListItemText primary={` ⛪ Religioso: ${censu?.censo_2022_estabelecimento_religioso_poi_counts}`}/>
        <ListItemText primary={` 🏥 Saúde: ${censu?.censo_2022_estabelecimento_saude_poi_counts}`}/>
        <ListItemText primary={` 🌱 Agro: ${censu?.censo_2022_estabelecimento_agro_poi_counts}`}/>
       
      </List>
    </Box>
  );
}
export default DrawereData;