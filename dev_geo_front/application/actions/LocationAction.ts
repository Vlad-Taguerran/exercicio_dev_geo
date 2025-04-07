'use server'
import Api from "@/infra/http/Api";
import { locationSchema } from "../schemas/LocationSchema";
import { AuthService } from "@/infra/auth/AuthService";
import { findAllAdresByUserId } from "../services/Address.service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addressAction = async (prevState: any, formData:FormData)=>{
  const dataToValidate = {
    address: formData.get('address') as string,   
    house_number: formData.get('house_number') as string,
    city: formData.get('city') as string,
    state: formData.get('state') as string,
    postcode: formData.get('postcode') as string,
    long: formData.get('lon') as string,        
    lat: formData.get('lat') as string,    
    notes: formData.get('notes') as string
  };

  const validatedFields = locationSchema.safeParse(dataToValidate);

  if (!validatedFields.success) {
    console.error('Erro de validação:', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'Erro de validação. Verifique os campos.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }


  try {
    const userId = await AuthService.getUserIdFromToken();
    
    if (!userId) {
      return {
        message: 'Usuário não autenticado.',
        success: false,
      };
    }
   const response = await Api(`/address/${userId}`,{method:"POST",body:JSON.stringify(validatedFields.data)});
    
   if(response.status == 201){
    return{
      
      message: "Ponto criado com sucesso",
      success: true
    }
   }
  } catch (error) {
    console.error('Erro ao salvar:', error);
    return {
      message: 'Falha ao salvar a localização no servidor.',
      errors: { general: 'Ocorreu um erro inesperado.' },
      success: false,
    };
  }
}
export const findAllAddresAction = async () =>{
  try {
    const userId = await AuthService.getUserIdFromToken();
    if (!userId) {
      return[]
    }
   
   const data = await findAllAdresByUserId(userId);
   console.log(data)
   if(!data){
    return [];
   }
   return data;
  } catch (error) {
    console.log(error);
  }
}