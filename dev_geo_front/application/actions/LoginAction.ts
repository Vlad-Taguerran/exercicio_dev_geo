'use server'
import { UserLoginSchema } from "@/application/schemas/UserSchema"
import { userLogin } from "../services/User.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const LoginAction = async (state: unknown | null, formData: FormData) =>{
  const validate = UserLoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });
  if(!validate.success){
    return {
      success:false,
      err: 'Email ou senha inválidos.'}
  }
  
 const response =  await userLogin(validate.data);
 
  if(response.err){
    return{
      success: false,
      message: "Erro ao autenticar"
    }
  }
  (await cookies()).set("authToken", response, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

 
redirect("/home")
}