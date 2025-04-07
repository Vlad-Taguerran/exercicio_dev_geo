import { NotFoundError } from "../../application/erros/NotFoundError";
import { UnauthorizedError } from "../../application/erros/UnauthorizedError";
import { DeleteAddressUseCase } from "../../application/useCases/address/DeleteAddressUseCase";
import { Address } from "../../domain/entities/Address";
import { User } from "../../domain/entities/User";
import { AddressRepository } from "../../infrastructure/database/repositories/AddressRepository";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";


describe("Delete Address UseCase", () => {
  let addressRepo: jest.Mocked<AddressRepository>;
  let userRepo: jest.Mocked<UserRepository>;
  let useCase: DeleteAddressUseCase;
  let user: User;
  let address: Address;

  const userId = "user-123";
  const addressId = "address-456";

  const location = { latitude: 1, longitude: 1 };

  beforeEach(() => {
    user = new User(userId, "João", "joao@email.com", "123456");
    address = new Address(
      addressId,
      "123",
      "Rua Exemplo",
      "Cidade Exemplo",
      "Estado",
      "00000-000",
      location,
      userId
    );

    addressRepo = {
      findById: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      findAllByUserId: jest.fn(),
      delete: jest.fn(), // se houver
    } as unknown as jest.Mocked<AddressRepository>;

    userRepo = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    useCase = new DeleteAddressUseCase(addressRepo, userRepo);
  });

  it("should pass if address and user are valid and match", async () => {
    addressRepo.findById.mockResolvedValue(address);
    userRepo.findById.mockResolvedValue(user);

    await expect(useCase.execute(addressId, userId)).resolves.not.toThrow();
  });

  it("should throw NotFoundError if address does not exist", async () => {
    addressRepo.findById.mockResolvedValue(null);
    userRepo.findById.mockResolvedValue(user);

    await expect(useCase.execute(addressId, userId)).rejects.toThrow(NotFoundError);
  });

  it("should throw NotFoundError if user does not exist", async () => {
    addressRepo.findById.mockResolvedValue(address);
    userRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(addressId, userId)).rejects.toThrow(NotFoundError);
  });

  it("should throw UnauthorizedError if the address is not the user's", async () => {
    const enderecoDeOutro = new Address(
      addressId,
      "123",
      "Outra Rua",
      "Outra Cidade",
      "Outro Estado",
      "11111-111",
      location,
      "outro-user-id"
    );

    addressRepo.findById.mockResolvedValue(enderecoDeOutro);
    userRepo.findById.mockResolvedValue(user);

    await expect(useCase.execute(addressId, userId)).rejects.toThrow(UnauthorizedError);
  });
});
