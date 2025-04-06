import { v4 } from "uuid";
import { Address } from "../../domain/entities/Address";
import { CreateAddressUseCase } from "../../application/useCases/address/CreateAddressUseCase";
import { IAddressRepository } from "../../domain/repositories/IAddressRepository";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { NotFoundError } from "../../application/erros/NotFoundError";
import { FindAllAddressByUserIdUseCase } from "../../application/useCases/address/FindAllAddressByUserIdUseCase";

describe("Create address Use Case", () => {
  let addresTest: Address[];
  let userTest: User;
  let mockRepository: IAddressRepository;
  let userRepo: IUserRepository;
  let findAllAddress: FindAllAddressByUserIdUseCase;

  const location = {
    latitude: 80,
    longitude: 80,
  };

  beforeEach(() => {
    userTest = new User(
      v4(),
      "teste",
      "teste@teste123.com",
      "test123"
    );

    const addresTest : Address[] = [new Address(
    "uuid-1",
      "13",
      "teste endereço",
      "teste cidade",
      "estado teste",
      "03018000",
      location
    )]

    userRepo = {
      findById: jest.fn().mockResolvedValue(userTest), 
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByEmail: jest.fn(),
    };

    mockRepository = {
      create: jest.fn(),
      findAllByUserId: jest.fn().mockResolvedValue(addresTest),
      update:jest.fn(),
      findById:jest.fn()
    };

    findAllAddress = new FindAllAddressByUserIdUseCase(mockRepository,userRepo);
  });

  it("should FindAll Address by user Id", async () => {
    
    const resultList = await findAllAddress.execute(userTest.id);

    expect(resultList.length).toBeGreaterThan(0);
    expect(resultList[0]).toBeInstanceOf(Address);
    expect(resultList[0].getId()).toBe("uuid-1");
    
  });

  

  it("should not FindAll Address by user Id", async () => {
    userRepo.findById = jest.fn().mockResolvedValue(null)
    const notFound = new FindAllAddressByUserIdUseCase(mockRepository,userRepo);
   await expect(notFound.execute("not found")).rejects.toBeInstanceOf(NotFoundError);
    
  });

 
});