
import { AddressUpdateDto } from "../../application/dtos/address/AddressUpdateDto";
import { ConflictError } from "../../application/erros/ConflictError";

export class Address {
  constructor(
    private readonly id: string,
    private house_number: string | undefined,
    private address: string |undefined,
    private city: string | undefined,
    private state: string | undefined,
    private postcode: string | undefined,
    private location: { latitude: number; longitude: number },
    private userId?: string,
    private notes?: string
  ) {}

  getId(): string {
    return this.id;
  }
  getUserId(): string | undefined{
    return this.userId;
  }

  getHouseNumber(): string | undefined {
    return this.house_number;
  }

  getAddress(): string |undefined {
    return this.address;
  }

  getCity(): string | undefined {
    return this.city;
  }

  getState(): string | undefined {
    return this.state;
  }

  getPostcode(): string | undefined {
    return this.postcode;
  }

  getLocation(): { latitude: number; longitude: number } {
    return this.location;
  }

  assignToUser(userId: string) {
    if(userId =='' || userId == undefined){
      throw new ConflictError("userId is Empity")
    }
    this.userId = userId;
  }
  getNotes(){
    return this.notes;
  }

  updatePartial(data: AddressUpdateDto) {
    if (data.house_number !== undefined) this.house_number = data.house_number;
    if (data.address !== undefined) this.address = data.address;
    if (data.city !== undefined) this.city = data.city;
    if (data.state !== undefined) this.state = data.state;
    if (data.postcode !== undefined) this.postcode = data.postcode;
  }
  

  
}