'use client'
import { addressAction } from "@/application/actions/LocationAction";
import { useLocationStore } from "@/application/stores/Location.store";
import { Box, Button, Card, CardContent, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { useActionState,} from "react";




const LocationForm = ()=>{
 

 const [formState, formAction,isPading] = useActionState(addressAction,undefined);
  const {location , modalState, changeModalState} = useLocationStore()
 
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
  };
  
return(
  <Modal open={modalState} onClose={changeModalState}>
  <Card sx={style}>
    <CardContent>
    <form action={formAction}>
      <Box display="flex" flexDirection="column" gap={2}> 
       
          <TextField
          id="address"
            label="Endereço"
            name="address"
            variant="outlined"
            value={location?.road}
            fullWidth
          />
          <TextField
            label="Número"
            name="house_number"
            variant="outlined"
            value={location?.house_number}
            fullWidth
          />
        

        <Box display="flex" gap={1}>
          <TextField
            label="Cidade"
            name="city"
            variant="outlined"
            value={location?.city}
            fullWidth
          />
          <TextField
            label="Estado"
            name="state"
            variant="outlined"
            value={location?.state}
            fullWidth
          />
        </Box>
        <TextField
          label="Cep"
          name="postcode"
          variant="outlined"
          value={location?.postcode}
          fullWidth
        />
       
       <Box display="flex" gap={1}>
          <TextField
            label="Latitude"
            name="lat"
            variant="outlined"
            value={location?.lat}
            fullWidth
          />
          <TextField
            label="Longitude"
            name="lon"
            variant="outlined"
            value={location?.lon}
            fullWidth
          />
        </Box>
 
{formState?.message && (
                <Typography
                  color={formState?.success ? 'green' : 'error'}
                  variant="body2"
                  sx={{ mt: 1 }} 
                >
                  {formState?.message}
                </Typography>
              )}
      </Box>
     <Box display="flex" gap={1} my={2} flexDirection={"row"}>
     <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isPading} 
        startIcon={isPading ? <CircularProgress size={20} color="inherit" /> : null} 
    >
      {isPading ? 'Salvando...' : 'Salvar'}
    </Button>
     <Button variant="contained" type="submit" color="error" onClick={changeModalState}>Cancelar</Button>
     </Box>
    </form>
    </CardContent>
  </Card>
</Modal>

)
}
export default LocationForm;