'use server'
import { getAllFiles, getFileByName, uploadFileService } from "../services/Files.service"
import { fileSchema } from "../schemas/FileSchema"

export const useGetAllFiles = async ()=>{
 return await getAllFiles()
}
export const getFileByFileName = async (filename:string) => {
  getFileByName(filename)
}

export const updateFile = async ( prevState: unknown,formData: FormData)=> {
  console.log("start")
  const file = formData.get('file') as File;
  console.log(file)
  const validation = fileSchema.safeParse(file);

  if(!validation.success){
    return {success: false, message: validation.error.errors[0].message }
  }
 
const response = await uploadFileService(file);
console.log(response)
  if(response?.ok){
    return{
      success: true,
      message: 'CSV Salvo com sucesso!'
    }
  } 

  return{
    success: false,
    message: 'Erro ao salvar'
  }

}