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