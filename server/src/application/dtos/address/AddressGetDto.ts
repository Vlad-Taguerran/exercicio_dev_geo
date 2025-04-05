export class AddressGetDto{
constructor(
  public id: string,
  public address: string |undefined,
  public house_number: string |undefined,
  public city: string |undefined,
  public state: string |undefined,
  public postcode: string |undefined,
  public latitude: string ,
  public longitude: string){}
  
}