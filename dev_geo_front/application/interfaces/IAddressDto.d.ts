export interface IAddressDto {
  id: string,
  house_number: string | undefined,
  address: string | undefined,
  city: string | undefined,
  state: string | undefined,
  postcode: string | undefined,
  latitude: string
  longitude: string
}