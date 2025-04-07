'use client'
import { LoginAction } from "@/application/actions/LoginAction";
import { Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { useActionState } from "react";


const  UserLoginForm = ()=> {
  const [formState, formAction, isPending] = useActionState(LoginAction, undefined)
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute',top:0, left:0,right:0,bottom:0}}>
      <Card sx={{height:'30rem', alignContent:'center', justifyContent:'center'}}>
        <CardContent>
       
        <form action={formAction}>
       
        <TextField
              id='email'
              label="Email"
              name='email'
              type="email"
              fullWidth
              margin="normal"
              required
            />
            <TextField
            id="password"
            name='password'
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              required
            />
             {formState?.message &&(
              <Typography align='center'>{formState.message}</Typography>
             )}
         <Button type="submit" onClick={()=>console.log("CLIK")} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              {!isPending ?<Typography>Entrar</Typography>: <CircularProgress/>}
            </Button>
        </form>
        </CardContent>
      </Card>
    </Box>
  );}

  export default UserLoginForm;