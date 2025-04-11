'use client'
import { updateFile } from "@/application/actions/FilesActions";
import { UploadFileTwoTone } from "@mui/icons-material";
import { Paper, Typography, Box, Button, Input } from "@mui/material";
import { useActionState } from "react";

const CsvForm = () =>{
  const initialState ={
    success: false,
    message: '',
  }
  
  const [error, action, isloading] = useActionState(updateFile,initialState)
  return(
    <Paper elevation={3} sx={{display:'flex', p:1, flexDirection:'column'}}>
    <Typography align="center" variant='h5'>Enviar CSV</Typography>
      <Box sx={{height:'25rem', width:'30rem', alignContent:'center', justifyContent:'center'}} >
        
      <form action={action}>
       <Box display={"flex"} flexDirection={'column'} gap={1}>
       
        <Button>
          <UploadFileTwoTone/>
          <Input name="file" type="file" hidden/>
        </Button>
        <Button type="submit" variant='contained' size='medium' >{isloading? 'Enviadndo...' : 'Enviar'}</Button>
       </Box>
       
      </form>
      {!error?.success ? <Typography color='error'>{error?.message}</Typography> : null}
      {error?.success ? <Typography color='success'>{error?.message}</Typography>:null}
      </Box>
    </Paper>
  );
}

export default CsvForm;