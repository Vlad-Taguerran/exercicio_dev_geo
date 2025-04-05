import { create } from "zustand"
import { IFile } from "../interfaces/IFilePath"
import { getAllFiles, getFileByName } from "../services/Files.service"

type state = {
  files: IFile[] | [],
  selected: string
}
type action = {
  selectFile:(data:string)=>void;
  loadFiles:()=>void;
}

export const useSelectStore = create<state & action>()((set)=>({
  files: [],
  selected: '',
  loadFiles: async()=>{
    try {
      const files = await getAllFiles();
      console.log(files)
      set({ files });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } 
  },
  selectFile: async (filename) => {
    try {
      await getFileByName(filename);
      set({ selected: filename }); 
    } catch (error) {
      console.error("Erro ao buscar arquivo:", error);
    }
  },
  
}))