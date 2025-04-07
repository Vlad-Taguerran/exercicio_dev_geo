'use client'

import { addressAction } from "@/application/actions/LocationAction";
import { useLocationStore } from "@/application/stores/Location.store";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState } from "react";
import { useEffect, useRef, useState } from "react";

const LocationForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction, isPending] = useActionState(addressAction, undefined);
  const [localFormState, setLocalFormState] = useState<typeof formState | undefined>(undefined);

  const { location, modalState, changeModalState, reset } = useLocationStore();

  useEffect(() => {
    setLocalFormState(formState);
  }, [formState]);

  
  const handleClose = () => {
    changeModalState();     
    reset();                
    setLocalFormState(undefined); 
    formRef.current?.reset();    
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={modalState} onClose={handleClose}>
      <Card sx={style}>
        <CardContent>
          <form ref={formRef} action={formAction}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                id="address"
                label="Endereço"
                name="address"
                variant="outlined"
                defaultValue={location?.road}
                fullWidth
              />
              <TextField
                label="Número"
                name="house_number"
                variant="outlined"
                defaultValue={location?.house_number}
                fullWidth
              />
              <Box display="flex" gap={1}>
                <TextField
                  label="Cidade"
                  name="city"
                  variant="outlined"
                  defaultValue={location?.city}
                  fullWidth
                />
                <TextField
                  label="Estado"
                  name="state"
                  variant="outlined"
                  defaultValue={location?.state}
                  fullWidth
                />
              </Box>
              <TextField
                label="Cep"
                name="postcode"
                variant="outlined"
                defaultValue={location?.postcode}
                fullWidth
              />
              <Box display="flex" gap={1}>
                <TextField
                  label="Latitude"
                  name="lat"
                  variant="outlined"
                  defaultValue={location?.lat}
                  fullWidth
                />
                <TextField
                  label="Longitude"
                  name="lon"
                  variant="outlined"
                  defaultValue={location?.lon}
                  fullWidth
                />
              </Box>
              <TextField
                label="Notas"
                name="notes"
                variant="outlined"
                fullWidth
              />
              {localFormState?.message && (
                <Typography
                  color={localFormState.success ? 'green' : 'error'}
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  {localFormState.message}
                </Typography>
              )}
            </Box>

            <Box display="flex" gap={1} my={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isPending}
                startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isPending ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button
                variant="contained"
                type="button"
                color="error"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default LocationForm;
