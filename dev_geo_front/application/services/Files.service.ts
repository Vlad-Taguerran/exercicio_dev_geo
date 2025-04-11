'use server'
import Api from '@/infra/http/Api';
import { IFile } from './../interfaces/IFilePath.d';

export const getAllFiles = async (): Promise<IFile[]> => {
  try {
    const data = await  Api("/files", { method: "GET" });
    return  data.json(); 
  } catch (error) {
    console.error("Erro ao buscar arquivos:", error);
    return [];
  }
};

export const getFileByName = async (filename:string) =>{
 try {
 await Api(`/file/${filename}`,{method:"GET"});
 } catch (err) {
  console.log(err)
 }
}

export const uploadFileService = async (file: File)=>{
  const newFormData = new FormData();
  newFormData.append('file', file);
  try {
   const response = await Api('csv',{method:'POST',body: newFormData});
    
   return response;
  } catch (error) {
    console.log(error)
  }
}