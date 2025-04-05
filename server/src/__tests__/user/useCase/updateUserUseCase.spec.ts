import { v4 } from 'uuid';
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from '../../../domain/entities/User';
import { UpdateUser } from '../../../application/useCases/user/UpdateUser';


describe("Update UseCase",()=>{
  let userTest: any;
  let mockRepository:IUserRepository;
  let updateUser: UpdateUser;
  
    beforeEach(() => {
        userTest = new User(
        v4(),
         "teste",
         "teste@teste123.com",
         "test123",
      )
  
      mockRepository = {
        create: jest.fn(),
        update: jest.fn().mockResolvedValue(userTest),
        findByEmail: jest.fn(),
        findById: jest.fn().mockResolvedValue(userTest),
        delete: jest.fn(),
      };
      
      updateUser = new UpdateUser(mockRepository);
    });
  
    it("Should update a user's name",async ()=>{

    const updatedUser = new User(
      userTest.id,
      "novo nome",
      userTest.email,
      userTest.password
    );
  

    const user = await updateUser.execute(updatedUser);
    expect(user).toBeInstanceOf(User);
    expect(mockRepository.update).toHaveBeenCalledWith(expect.objectContaining({
      id: userTest.id,
      name: "novo nome"
    }));
    expect(user?.id).toBe(userTest.id);
  }),


  it('Should not update user if not found by id', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(null);
  
    updateUser = new UpdateUser(mockRepository); 
  
    await expect(updateUser.execute(userTest))
      .rejects
      .toThrow("User not found");
  });
})