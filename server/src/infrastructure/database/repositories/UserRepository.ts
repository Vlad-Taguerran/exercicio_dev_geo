import { User } from '../../../domain/entities/User';
import { IUserRepository } from './../../../domain/repositories/IUserRepository';
export class UserRepository implements IUserRepository{
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<string | null> {
    throw new Error('Method not implemented.');
  }
  
}