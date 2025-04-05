import Api from "@/infra/http/Api";
import { IUser } from "../interfaces/IUser";

export const createUser = async (user:IUser) =>{
 const response = await Api("/user",{method:"POST",body:JSON.stringify(user)});
  if(!response.ok){
    throw new Error("Erro ao criar usuario!");
  }
  return await response;
} 
export const userLogin = async (loginData: { email: string; password: string; })=>{
try {
  const response = await Api("auth",{method:"POST",body:JSON.stringify(loginData)});
  const login = await response.json();
  return login;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error:any) {
  console.error("Erro no login:", error);
    return { err: error.message || "Erro ao tentar conexão com o servidor" };
}
}