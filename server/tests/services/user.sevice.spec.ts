import UserService from '../../src/services/user.service';
import Injector from '../../src/di/injector';
import { di } from '../../src/di/index';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';
import { NotFoundError, BadRequestError, InternalServerError } from '../../src/utils/errors/http.error';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let injector: Injector = di;

  const userMocked = new UserEntity({
    id: "ce6f5c66-1967-4b21-9929-51ca7d652151",
    CPF: "12989087064",
    name: "Clara Acrucha",
    username: "acrucha",
    email: "mvsm3@mail.com",
    password: "abcdef12",
    payment: "PIX",
    address: [
        "Avenida Acrucha 5"
    ],
    phone: "999789923",
    code: ""
  });

  const newUserMocked = new UserEntity({
    id: "ce6f5c66-1967-4b21-9929-51ca7d652151",
    CPF: "12345678911",
    name: "Clarinha",
    username: "acruchinha",
    email: "mvsm3@mail.com",
    password: "clara123",
    payment: "Crédito 0004",
    address: [
        "Avenida Acrucha 5", "Avenida Clara 10"
    ],
    phone: "999789910",
    code: ""
  });

  const exceptedUserMocked = new UserEntity({
    id: "ce6f5c66-1967-4b21-9929-51ca7d652151",
    CPF: "12989087064",
    name: "Clarinha",
    username: "acrucha",
    email: "mvsm3@mail.com",
    password: "abcdef12",
    payment: "PIX",
    address: [
        "Avenida Acrucha 5", "Avenida Clara 10"
    ],
    phone: "999789910",
    code: ""
  });


  function getUserByIdMockedToAGivenUser(user: UserEntity): (id: string) =>
                                                            Promise<UserEntity | undefined> {
    return (id: string) => {
      if (id === user.id) {
        return Promise.resolve(user);
      }
      return Promise.resolve(undefined);
    };
  }

  function getUserByEmailMockedToAGivenUser(user: UserEntity): (email: string) =>
                                                                Promise<UserEntity | undefined> {
    return (email: string) => {
      if (email === user.email) {
        return Promise.resolve(user);
      }
      return Promise.resolve(undefined);
    };
  }

  beforeEach(() => {
    injector.registerRepository(UserRepository, new UserRepository());
    userRepository = injector.getRepository(UserRepository);

    injector.registerService(UserService, new UserService(userRepository));
    userService = injector.getService(UserService);
  });

  it('[getUserById] should return an user by id', async () => {
    jest.spyOn(userRepository, 'getUserById').mockImplementation(
                                              getUserByIdMockedToAGivenUser(userMocked));

    const result = await userService.getUserById(userMocked.id);
    expect(result).toEqual(userMocked);
  });

  it('[getUserById] should throw a NotFoundError due to unkown id', async () => {
    const id = "c32d8b45-92fe-44f6-8b61-42c2107dfe87";

    jest.spyOn(userRepository, 'getUserById').mockImplementation(
                                              getUserByIdMockedToAGivenUser(userMocked));

    expect(async () => { await userService.getUserById(id)}).rejects.toThrow(NotFoundError);
  });

  it('[getUserByEmail] should return a user by email', async () => {
    jest.spyOn(userRepository, 'getUserByEmail').mockImplementation(
                                                 getUserByEmailMockedToAGivenUser(userMocked));

    const result = await userService.getUserByEmail(userMocked.email);
    expect(result).toEqual(userMocked);
  });

  it('[getUserByEmail] should throw a NotFoundError due to unkown email', async () => {
    const email = "other@mail.com";

    jest.spyOn(userRepository, 'getUserByEmail').mockImplementation(
                                                 getUserByEmailMockedToAGivenUser(userMocked));

    expect(async () => { await userService.getUserByEmail(email)}).rejects.toThrow(NotFoundError);
  });

  it('[deleteUserById] should delete an user by id', async () => {
      jest.spyOn(userRepository, 'getUserById').mockImplementation(
                                                getUserByIdMockedToAGivenUser(userMocked));
      jest.spyOn(userRepository, 'deleteUserById').mockResolvedValue(void 0);

      const result = await userService.deleteUserById(userMocked.id, userMocked.password);
      expect(result).toBeUndefined();
  });

  it('[deleteUserById] should throw a BadRequestError due to incorrect password', async () => {
    const password = "error321"
    jest.spyOn(userRepository, 'getUserById').mockImplementation(
                                              getUserByIdMockedToAGivenUser(userMocked));
    jest.spyOn(userRepository, 'deleteUserById').mockResolvedValue(void 0);

    expect(async () => { await userService.deleteUserById(userMocked.id, password)}).rejects.toThrow(BadRequestError);
  });

  it('[updateUserById] should update an user by id', async () => {
      jest.spyOn(userRepository, 'getUserById').mockImplementation(
                                                getUserByIdMockedToAGivenUser(userMocked));
      jest.spyOn(userRepository, 'updateUserById').mockResolvedValue(exceptedUserMocked);

      const result = await userService.updateUserById(userMocked.id, newUserMocked);
      expect(result).toBeUndefined();
  });

  it('[updateUserById] should throw a InternalServerError due to wrong user data after update', async () => {
    jest.spyOn(userRepository, 'getUserById').mockImplementation(
                                              getUserByIdMockedToAGivenUser(userMocked));

    jest.spyOn(userRepository, 'updateUserById').mockResolvedValue(userMocked);

    expect(async () => { await userService.updateUserById(userMocked.id, newUserMocked)}).
                              rejects.toThrow(InternalServerError);
  });

  it('[updateUserById] should throw a InternalServerError due to undefined user after update', async () => {
    jest.spyOn(userRepository, 'getUserById').mockImplementation(
                                              getUserByIdMockedToAGivenUser(userMocked));
    jest.spyOn(userRepository, 'updateUserById').mockResolvedValue(undefined); 

    expect(async () => { await userService.updateUserById(newUserMocked.id, newUserMocked)}).
                               rejects.toThrow(InternalServerError);
  });
});