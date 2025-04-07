import { v4 } from 'uuid';
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from '../../../domain/entities/User';
import { FindUserById } from '../../../application/useCases/user/FindUserByIdUseCase';


describe("FindUseCase",()=>{
  let userTest: any;
  let mockRepository:IUserRepository;
  let findUser: FindUserById;
  
    beforeEach(() => {
        userTest = new User(
        v4(),
         "teste",
         "teste@teste123.com",
         "test123",
      )
  
      mockRepository = {
        create: jest.fn(),
        update: jest.fn(),
        findByEmail: jest.fn(),
        findById: jest.fn().mockResolvedValue(userTest),
        delete: jest.fn(),
      };
  
      findUser = new FindUserById(mockRepository);
    });
  it('Should find User By id',async ()=>{
    const user = await findUser.execute(userTest.id);
    expect(user).toBeInstanceOf(User);
    expect(user?.id).toBe(userTest.id);
  }),


  it('Should not find User By id',async ()=>{
    mockRepository.findById = jest.fn().mockResolvedValue(null);
  findUser = new FindUserById(mockRepository); 

  await expect(findUser.execute(v4()))
    .rejects
    .toThrow("User not found");
  })
})