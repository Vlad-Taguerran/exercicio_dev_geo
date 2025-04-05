export class AddressCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly address: string,
    public readonly house_number: string,
    public readonly city: string,
    public readonly state: string,
    public readonly postcode: string,
    public readonly lat: number,
    public readonly long: number
  ) {}
}
