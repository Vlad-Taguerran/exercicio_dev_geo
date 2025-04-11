import CsvForm from "@/components/forms/CsvForm";
import { Box} from "@mui/material";

const CadastroCsv = () =>{
  return(
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute',top:0, left:0,right:0,bottom:0}}>
      <CsvForm/>
  </Box>
  );
}

export default CadastroCsv;