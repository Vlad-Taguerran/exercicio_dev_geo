import Api from "@/infra/http/Api"
import { getAllFiles, getFileByName } from "../services/Files.service"

export const useGetAllFiles = async ()=>{
 return await getAllFiles()
}
export const getFileByFileName = async (filename:string) => {
  getFileByName(filename)
}

export const updateFile = async ( prevState: any,formData: FormData)=> {
  const file = formData.get('csvFile') as File | null;
  if (!file || file.size === 0) {
    return { message: null, error: 'Nenhum arquivo CSV foi enviado.', fieldErrors: { file: ['Arquivo é obrigatório.'] } };
}
console.log(`Server Action: Arquivo recebido: ${file.name}, Tamanho: ${file.size}, Tipo: ${file.type}`);
try {

  const externalFormData = new FormData();


  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileBlob = new Blob([fileBuffer], { type: file.type });

  
  externalFormData.append('csv', fileBlob, file.name);


 //TO DO
 //Finalizar logica de envio de csv
 // criar componente de input
  const response = await Api("csv", {
    method: 'POST',
    body: externalFormData,
  });
 



}catch(error){
    console.log(error);
  }


}