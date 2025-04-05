import { getAllFiles, getFileByName } from "../services/Files.service"

export const useGetAllFiles = async ()=>{
 return await getAllFiles()
}
export const getFileByFileName = async (filename:string) => {
  getFileByName(filename)
}