export class AddressPostDto{
  address: string;
  house_number: string;
  city: string;
  state: string;
  postcode: string;
  long: string;
  lat: string;
constructor(
  address: string,
  house_number: string,
  city: string,
  state: string,
  postcode: string,
  long: string,
  lat: string){
    this.address = address;
    this.house_number = house_number;
    this.city =city;
    this.state = state;
    this.postcode =postcode;
    this.long = long;
    this.lat = lat;
  }

}