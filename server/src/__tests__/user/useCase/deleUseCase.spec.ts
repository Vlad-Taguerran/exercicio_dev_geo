import { v4 } from 'uuid';
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from '../../../domain/entities/User';
import { DeleteUseCase } from '../../../application/useCases/user/DeleteUseCase';
import { NotFoundError } from '../../../application/erros/NotFoundError';


describe("Delet UseCase",()=>{
  let userTest: any;
  let mockRepository:IUserRepository;
  let deleteUser: DeleteUseCase;
  
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
        delete: jest.fn().mockResolvedValue(true),
      };
      
      deleteUser = new DeleteUseCase(mockRepository);
    });
  
    it("Should Delete a user",async ()=>{

    const user = await deleteUser.execute(userTest.id);
    expect(user).toBeUndefined();  
    expect(mockRepository.delete).toHaveBeenCalledWith(userTest.id);
  }),


  it('Should not update user if not found by id', async () => {
  mockRepository.delete = jest.fn().mockResolvedValue(false);
  const deleteUseCase = new DeleteUseCase(mockRepository);

    await expect(deleteUseCase.execute(v4()))
      .rejects
      .toBeInstanceOf(NotFoundError);
  });
})