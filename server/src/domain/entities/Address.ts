export class Address {
  constructor(
    private readonly id: string,
    private house_number: string | undefined,
    private address: string |undefined,
    private city: string | undefined,
    private state: string | undefined,
    private postcode: string | undefined,
    private location: { latitude: number; longitude: number }
  ) {}

  getId(): string {
    return this.id;
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
}