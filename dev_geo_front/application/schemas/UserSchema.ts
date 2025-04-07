import { z } from "zod";


export const UserLoginSchema = z.object({
  email:z.string(),
  password: z.string()
})