import { v4 } from "uuid";
import { UserAlreadyExistsError } from "../../../application/erros/UserAlreadyExistsError";
import { CreateUser } from "../../../application/useCases/user/CreateUser";
import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

describe("CreateUser Use Case",()=>{

  let userTest: any;
  let mockRepository: IUserRepository;
  let createUser: CreateUser;

  beforeEach(() => {
    userTest = new User(
      v4(),
       "teste",
       "teste@teste123.com",
       "test123",
    )

    mockRepository = {
      create: jest.fn().mockResolvedValue(userTest),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update:jest.fn(),
      delete: jest.fn(),
    };

    createUser = new CreateUser(mockRepository);
  });


it("should create a user successfully",async ()=>{
 
 
  const user = await createUser.execute(userTest);

  expect(user).toBeInstanceOf(User);
  expect(user.name).toBe(userTest.name);
  expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining(userTest));

}
),
it("should fail to create a user same email",async ()=>{
  mockRepository.findByEmail = jest.fn().mockResolvedValue(userTest);
  createUser = new CreateUser(mockRepository);
  await expect(createUser.execute(userTest)).rejects.toBeInstanceOf(UserAlreadyExistsError); 
  expect(mockRepository.create).not.toHaveBeenCalled();
})})
