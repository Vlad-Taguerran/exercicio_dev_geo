'use client'
import { useMapActions } from "@/application/stores/MapActions.store";
import { AppBar, Container, Toolbar, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SelectFile from "./SelectFile";

 const AppBarComponent = ()=>{
  const {pinMapState,changePinMapState}= useMapActions()

  return(
    <AppBar position="static" color="secondary">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', } }}>
           
              
              <Button
                onClick={changePinMapState}
                variant="contained"
                sx={{ my: 2,mx: '1rem', color: 'white', display: 'block' }}
              >
               {!pinMapState ?  <Typography>Adicionar Pino</Typography>:  <Typography>Cancelar</Typography>}
              </Button>
              
              <SelectFile/>
            
          </Box>
        </Toolbar>
        </Container>
        </AppBar>
  )
 }
export default AppBarComponent;