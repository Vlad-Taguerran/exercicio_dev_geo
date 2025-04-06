export type UpdateAddressDTO = {
  house_number?: string;
  address?: string;
  city?: string;
  state?: string;
  postcode?: string;
  location?: { latitude: number; longitude: number };
};