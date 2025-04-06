import { v4 } from "uuid";
import { Address } from "../../domain/entities/Address";
import { IAddressRepository } from "../../domain/repositories/IAddressRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { NotFoundError } from "../../application/erros/NotFoundError";
import { UpdateAddressUseCase } from "../../application/useCases/address/UpdateAddressUseCase";
import { UnauthorizedError } from "../../application/erros/UnauthorizedError";


describe("Update Address UseCase", () => {
  let addressRepo: jest.Mocked<IAddressRepository>;
  let userRepo: jest.Mocked<IUserRepository>;
  let useCase: UpdateAddressUseCase;
  let user: User;
  let address: Address;

  const userId = v4();
  const addressId = v4();

  const location = { latitude: 10, longitude: 10 };

  beforeEach(() => {
    user = new User(userId, "User", "user@test.com", "123456");
    address = new Address(addressId, "123", "Rua A", "Cidade", "Estado", "00000000", location, userId,);

    addressRepo = {
      findById: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      findAllByUserId: jest.fn(),
    };

    userRepo = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByEmail: jest.fn(),
    };

    useCase = new UpdateAddressUseCase(addressRepo, userRepo);
  });

  it("should update the address successfully", async () => {
    addressRepo.findById.mockResolvedValue(address);
    userRepo.findById.mockResolvedValue(user);

    await useCase.execute(address);

    expect(addressRepo.update).toHaveBeenCalledWith(address);
  });

  it("should throw error if user not found", async () => {
    addressRepo.findById.mockResolvedValue(address);
    userRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(address)).rejects.toThrow(NotFoundError);
  });

  it("should throw error if address not found", async () => {
    addressRepo.findById.mockResolvedValue(null);
    userRepo.findById.mockResolvedValue(user);

    await expect(useCase.execute(address)).rejects.toThrow(NotFoundError);
  });

  it("should throw error if address does not belong to user", async () => {
    const addressDeOutroUsuario = new Address(addressId, "123", "Rua A", "Cidade", "Estado", "00000000", location, "id-diferente");

    addressRepo.findById.mockResolvedValue(addressDeOutroUsuario);
    userRepo.findById.mockResolvedValue(user);

    await expect(useCase.execute(address)).rejects.toThrow(UnauthorizedError);
  });
});