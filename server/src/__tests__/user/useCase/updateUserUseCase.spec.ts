import { v4 } from 'uuid';
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from '../../../domain/entities/User';
import { UpdateUser } from '../../../application/useCases/user/UpdateUser';
import { IHashService } from '../../../domain/interfaces/IHashService';

describe("Update UseCase", () => {
  let userTest: User;
  let mockHashService: IHashService;
  let mockRepository: IUserRepository;
  let updateUser: UpdateUser;

  beforeEach(() => {
    userTest = new User(
      v4(),
      "teste",
      "teste@teste123.com",
      "test123"
    );

    mockRepository = {
      create: jest.fn(),
      update: jest.fn().mockResolvedValue(userTest),
      findByEmail: jest.fn(),
      findById: jest.fn().mockResolvedValue(userTest),
      delete: jest.fn(),
    };
    mockHashService = {
      hash: jest.fn().mockImplementation(async (val: string) => `${val}`),
      compare: jest.fn(),
    };

    updateUser = new UpdateUser(mockRepository,mockHashService);
  });

  it("Should update a user's name", async () => {
    const updateDto = { id: userTest.id, name: "novo nome" };

    const user = await updateUser.execute(updateDto);

    expect(user).toBeInstanceOf(User);
    expect(mockRepository.update).toHaveBeenCalledWith(expect.objectContaining({
      id: userTest.id,
      name: "novo nome"
    }));
    expect(user?.id).toBe(userTest.id);
  });

  it("Should update user's email only", async () => {
    const updateDto = { id: userTest.id, email: "new@email.com" };

    const user = await updateUser.execute(updateDto);
    expect(user).not.toBeNull(); 
    const notNullUser = user as User;

    expect(notNullUser.email).toBe("new@email.com");
    expect(mockRepository.update).toHaveBeenCalled();
  });

  it('Should not update user if not found by id', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(null);

    updateUser = new UpdateUser(mockRepository,mockHashService); 

    await expect(updateUser.execute({ id: userTest.id }))
      .rejects
      .toThrow("User not found");
  });
});
