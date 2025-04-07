import {z} from 'zod'

export interface LocationActionState {
  message: string | null;
  errors?: {
    address?: string[] | undefined;
    house_number?: string[] | undefined;
    city?: string[] | undefined;
    state?: string[] | undefined;
    postcode?: string[] | undefined;
    long?: string[] | undefined;
    lat?: string[] | undefined;
    notes?:string[]| undefined;
    general?: string;
  } | null;
  success?: boolean;
}
export const locationSchema = z.object({
  address: z.string(),
  house_number: z.string(),
  city: z.string(),
  state: z.string(),
  postcode: z.string(),
  long: z.string(),
  lat: z.string(),
  notes: z.string()

})