import { z } from "zod";


export const fileSchema = z.instanceof(File).refine((file)=>[
  "text/csv",
].includes(file.type),
{message: "Formato inválido. Apenas arquivos CSV são permitidos."}
).refine((file)=>file.size > 0,{message:"O arquivo está vazio." });