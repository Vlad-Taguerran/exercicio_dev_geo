import { v4 } from "uuid";
import { Address } from "../../domain/entities/Address";
import { CreateAddressUseCase } from "../../application/useCases/address/CreateAddressUseCase";
import { IAddressRepository } from "../../domain/repositories/IAddressRepository";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { NotFoundError } from "../../application/erros/NotFoundError";

describe("Create address Use Case", () => {
  let addresTest: Address;
  let userTest: User;
  let mockRepository: IAddressRepository;
  let userRepo: IUserRepository;
  let createAddress: CreateAddressUseCase;

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

    addresTest = new Address(
      v4(),
      "13",
      "teste endereço",
      "teste cidade",
      "estado teste",
      "03018000",
      location
    );

    userRepo = {
      findById: jest.fn().mockResolvedValue(userTest), 
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByEmail: jest.fn(),
    };

    mockRepository = {
      create: jest.fn().mockResolvedValue(addresTest),
      findAllByUserId: jest.fn(),
      findById: jest.fn(),
      update: jest.fn()
    };

    createAddress = new CreateAddressUseCase(mockRepository, userRepo);
  });

  it("should create a address successfully", async () => {
    addresTest.assignToUser(userTest.id);
    const address = await createAddress.execute(addresTest);

    expect(address).toBeInstanceOf(Address);
    expect(address.getId()).toBe(addresTest.getId());
    expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      id: addresTest.getId(),
      userId: userTest.id,
    }));
  });

  it("should fail to create a address not found user", async () => {
    (userRepo.findById as jest.Mock).mockResolvedValue(null);

    await expect(createAddress.execute(addresTest))
      .rejects.toBeInstanceOf(NotFoundError);

    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});