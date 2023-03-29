import UserEntity from '../entities/user.entity';
import { InternalServerError } from '../utils/errors/http.error';
import { BaseRepository } from './base.repository';

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super('users');
  }

  public async getUsers(): Promise<UserEntity[]> {
    try {
      return await this.findAll();
    } catch (e) {
      throw new InternalServerError();
    }
  }

  public async getUserById(id: string): Promise<UserEntity | undefined> {
    try {
      let users = await this.findAll();
      let user = users.find((user) => user.id === id);
      
      return user;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  public async deleteUserById(id: string): Promise<void> {
    try {
      let users = await this.findAll();
      let user = users.find((user) => user.id === id);
      
      if(user) {
        await this.delete(user);
      }
    } catch (e) {
      throw new InternalServerError();
    }
  }

  public async updateUserById(data: UserEntity): Promise<UserEntity | undefined> {
    try {
      let user = await this.update(data);

      return user;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  public async signUp(data: UserEntity): Promise<UserEntity | undefined> {
    try {
      let user = await this.add(data);

      return user;
    } catch(e) {
      throw new InternalServerError();
    }
  }
}

export default UserRepository;
