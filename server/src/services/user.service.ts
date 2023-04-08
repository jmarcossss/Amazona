import UserModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import { NotFoundError, BadRequestError, InternalServerError } from '../utils/errors/http.error';
import logger from '../logger';
import UserEntity from '../entities/user.entity';

class UserServiceMessageCode {
  public static readonly user_not_found = 'user_not_found';
  public static readonly user_update_error = 'user_update_error';
  public static readonly incorrect_password = 'incorrect_password';
}

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<UserModel[]> {
    try {
      const users = await this.userRepository.getUsers();

      const results = await Promise.all(
        users.map(async (user) => {
          try {
            return new UserModel({
              ...user
            });
          } catch (e) {
            logger.error(
              `[UserService][getUsers] Error while processing brand ${user.id}:`,
              e
            );
            return null;
          }
        })
      );

      const filteredUsers = results.filter(
        (result) => result !== null
      ) as UserModel[];

      return filteredUsers;
    } catch (e) {
      throw e;
    }
  }

  public async getUserById(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new NotFoundError({
          msg: 'User not found!',
          msgCode: UserServiceMessageCode.user_not_found,
        });
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.getUserByEmail(email);

      if(!user) {
        throw new NotFoundError({
          msg: 'User not found!',
          msgCode: UserServiceMessageCode.user_not_found,
        });
      }

      return user
    } catch (e) {
      throw e;
    }
  }

  public async deleteUserById(id: string, password: string): Promise<void> {
    try {
      const user = await this.getUserById(id);

      if(user.password != password) {
        throw new BadRequestError({
          msg: 'Incorrect password!',
          msgCode: UserServiceMessageCode.incorrect_password,
        });
      }

      await this.userRepository.deleteUserById(id);
    } catch (e) {
      throw e;
    }
  }

  public async updateUserById(id: string, data: UserEntity): Promise<void> {
    try {
      const user = new UserEntity(await this.getUserById(id));
      user.updateUserPartially(data);
      
      const updatedUser = await this.userRepository.updateUserById(user);

      if(!updatedUser || JSON.stringify(user) !== JSON.stringify(updatedUser)) {
        throw new InternalServerError({
          msg: 'Error in updating user!',
          msgCode: UserServiceMessageCode.user_update_error,
        });
      }
    } catch (e) {
      throw e;
    }
  }
}

export default UserService;
