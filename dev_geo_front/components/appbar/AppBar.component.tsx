'use client'
import { useMapActions } from "@/application/stores/MapActions.store";
import {Container, Toolbar, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SelectFile from "./SelectFile";

 const AppBarComponent = ()=>{
  const {pinMapState,changePinMapState}= useMapActions()

  return(
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', } }}>
           
              <Button
                onClick={changePinMapState}
                variant="contained"
                color="info"
                sx={{ my: 2,mx: '1rem', color: 'white', display: 'block' }}
              >
               {!pinMapState ?  <Typography variant="body2">Adicionar Pino</Typography>:  <Typography variant="body2">Cancelar</Typography>}
              </Button>
              
              <SelectFile/>
            
          </Box>
        </Toolbar>
        </Container>
  )
 }
export default AppBarComponent;