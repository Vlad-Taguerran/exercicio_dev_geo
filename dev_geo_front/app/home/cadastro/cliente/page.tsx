import { Box, Button, Paper, TextField } from "@mui/material"

const CadastroClient = () =>{
  return(
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute',top:0, left:0,right:0,bottom:0}}>
      <Paper elevation={3} sx={{display:'flex', p:1}}>
        <Box sx={{height:'25rem', width:'30rem', alignContent:'center', justifyContent:'center'}} >
        <form>
         <Box display={"flex"} flexDirection={'column'} gap={1}>
         <TextField 
          id='name'
          name='name'
          variant='filled'
          label='Nome'
          />
          <TextField
            id='email'
            name='email'
            variant='filled'
            label='Email'
          />
          <TextField
            id='password'
            name='password'
            variant='filled'
            label='senha'
          />
          <Button variant='contained' size='medium' >Salvar</Button>
         </Box>
         
        </form>
        </Box>
      </Paper>
    </Box>
  );
}

export default CadastroClient;