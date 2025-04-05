import { v4 } from 'uuid';
import { FindUserByEmail } from '../../../application/useCases/user/FindUserByEmail';
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserGetDto } from '../../../application/dtos/User/UserDto';
import { User } from '../../../domain/entities/User';


describe("FindUseCase",()=>{
  let userTest: any;
  let mockRepository:IUserRepository;
  let findUser: FindUserByEmail;
  
    beforeEach(() => {
        userTest = new User(
        v4(),
         "teste",
         "teste@teste123.com",
         "test123",
      )
  
      mockRepository = {
        create: jest.fn(),
        update:jest.fn(),
        findByEmail: jest.fn().mockResolvedValue(userTest),
        findById: jest.fn(),
        delete: jest.fn(),
      };
  
      findUser = new FindUserByEmail(mockRepository);
    });
  it('Should find User By Email',async ()=>{
    const user = await findUser.execute(userTest.email);
    expect(user).toBeInstanceOf(User);
    expect(user?.id).toBe(userTest.id);
  }),
  it('Should not find User By Email',async ()=>{
    mockRepository.findByEmail = jest.fn().mockResolvedValue(null);
  findUser = new FindUserByEmail(mockRepository); 

  await expect(findUser.execute("invalido@teste.com"))
    .rejects
    .toThrow("User not found");
  })
})