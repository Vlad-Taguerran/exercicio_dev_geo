export class AddressUpdateDto {
 public id?: string;
   public userId?: string;
   public house_number?: string;
   public address?: string;
   public city?: string;
   public state?: string;
   public postcode?: string;
   public notes?: string;
  constructor(
    id: string,
    userId: string,
    house_number?: string,
    address?: string,
    city?: string,
    state?: string,
    postcode?: string,
    notes?: string
  ){
    this.id =id;
    this.userId = userId;
    this.house_number = house_number;
    this.address = address;
    this.city = city;
    this.state = state;
    this.postcode = postcode;
    this. notes = notes;
  }

}