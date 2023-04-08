import UserService from '../../src/services/user.service';
import AuthenticationService from '../../src/services/authentication.service';
import Injector from '../../src/di/injector';
import { di } from '../../src/di/index';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';
import UserModel from '../../src/models/user.model';
import { NotFoundError, BadRequestError, InternalServerError } from '../../src/utils/errors/http.error';

describe('UserService', () => {
  let autheticationService: AuthenticationService
  let userService: UserService;
  let userRepository: UserRepository;
  let injector: Injector = di;
  const mockedUserModel = new UserModel({
    id: "0b718259-44a4-4a03-9491-c4374f5e3b33",
    CPF: "00342153411",
    name: "Rafinha dos Reis",
    username: "rafinha",
    email: "rrl3@cin.ufpe.br",
    payment: "PIX",
    address: [],
    phone: "",
  });
  const mockedUser = new UserEntity({
    id: "0b718259-44a4-4a03-9491-c4374f5e3b33",
    CPF: "00342153411",
    name: "Rafinha dos Reis",
    username: "rafinha",
    email: "rrl3@cin.ufpe.br",
    password: "1234567a",
    payment: "PIX",
    address: [],
    phone: "", 
    code: "1234"
  });
  const newMockedUser = new UserEntity({
    CPF: "00042123411",
    name: "Sophia Moraes", 
    username: "sophie", 
    email: "sophia@mail.com", 
    password: "baunilh0",
    payment: "PIX",
    address: [],
    phone: "",
    code: ""
  });
  const mockedUsers: UserEntity[] = [new UserEntity({
    id: "ce6f5c66-1967-4b21-9929-51ca7d652151",
    CPF: "12989087064",
    name: "Clarinha",
    username: "acrucha",
    email: "acrucha@mail.com",
    password: "abcdef12",
    payment: "PIX",
    address: [
        "Avenida Acrucha 5", "Avenida Clara 10"
    ],
    phone: "999789910",
    code: ""
  }), 
    new UserEntity({
      id: "0b718259-44a4-4a03-9491-c4374f5e3b33",
      CPF: "00342153411",
      name: "Rafinha dos Reis",
      username: "rafinha",
      email: "rrl3@cin.ufpe.br",
      password: "1234567a",
      payment: "PIX",
      address: [],
      phone: "", 
      code: "1234"
  }),
    new UserEntity({
      id: "6f4bead0-2504-4035-9cc4-335d5e42dd24",
      CPF: "12342153400",
      name: "Pâmela Cristian",
      username: "pampam",
      email: "pam@mail.com",
      password: "abcdef00",
      payment: "Crédito 0001",
      address: [],
      phone: "", 
      code: ""
  })];

  beforeEach(() => {
    injector.registerRepository(UserRepository, new UserRepository());
    userRepository = injector.getRepository(UserRepository);

    injector.registerService(UserService, new UserService(userRepository));
    userService = injector.getService(UserService);

    injector.registerService(AuthenticationService, new AuthenticationService(
                             userService, userRepository));
    autheticationService = injector.getService(AuthenticationService);
  });

  it('[signIn] should sign in an user using email', async () => {
    const user = new UserEntity({email: "rrl3@cin.ufpe.br", password: "1234567a"});
    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers);

    const result = await autheticationService.signIn(user);
    expect(result).toEqual(mockedUserModel);
  });

  it('[signIn] should sign in an user using username', async () => {
    const user = new UserEntity({username: "rafinha", password: "1234567a"});
    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers);

    const result = await autheticationService.signIn(user);
    expect(result).toEqual(mockedUserModel);
  });

  it('[signIn] should throw a NotFoundError due to unkown email', async () => {
    const user = new UserEntity({email: "email@mail.com", password: "1234567a"});
    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers);

    expect(async () => { await autheticationService.signIn(user)}).rejects.toThrow(NotFoundError);
  });

  it('[signIn] should throw a NotFoundError due to unkown username', async () => {
    const user = new UserEntity({username: "user", password: "1234567a"});
    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers);

    expect(async () => { await autheticationService.signIn(user)}).rejects.toThrow(NotFoundError);
  });

  it('[signIn] should throw a BadRequestError due to incorrect password', async () => {
    const user = new UserEntity({username: "rafinha", password: "error321"});

    expect(async () => { await autheticationService.signIn(user)}).rejects.toThrow(BadRequestError);
  });

  it('[signUpValidation] should approve sign up operation', async () => {
    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers);

    const result = await autheticationService.signUpValidation(newMockedUser);
    expect(result).toBeUndefined();
  });

  it('[signUpValidation] should throw BadRequestError due to already used data', async () => {
    const user = new UserEntity({
      CPF: "12989087064",
      name: "Sophia Moraes",
      username: "pampam", 
      email: "pam@mail.com",
      password: "baunilh0",
      payment: "PIX",
      address: [],
      phone: "",
      code: ""
    })

    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers);

    expect(async () => { await autheticationService.signUpValidation(user)}).rejects.toThrow(BadRequestError);
  });

  it('[signUpValidation] should throw BadRequestError due to data invalid format', async () => {
    const user = new UserEntity({
      CPF: "error",
      name: "Sophia Moraes",
      username: "sophie", 
      email: "error",
      password: "error",
      payment: "PIX",
      address: [],
      phone: "",
      code: ""
    })

    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers);
    expect(async () => { await autheticationService.signUpValidation(user)}).rejects.toThrow(BadRequestError);
  });

  it('[signUp] should sign up an user', async () => {
    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers); 
    jest.spyOn(userRepository, 'signUp').mockResolvedValue(newMockedUser);

    const result = await autheticationService.signUp(newMockedUser);
    expect(result).toBeUndefined();
  });

  it('[signUp] should throw BadRequestError due to undefined user after creation callback', async () => {
    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers); 
    jest.spyOn(userRepository, 'signUp').mockResolvedValue(undefined);

    expect(async () => { await autheticationService.signUp(newMockedUser)}).rejects.toThrow(BadRequestError);
  });

  it('[recoverPasswordCode] should allow user to recover his password', async () => {
    const email = "rrl3@cin.ufpe.br";
    const code = '1234';

    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockedUser); 
    jest.spyOn(userService, 'updateUserById').mockResolvedValue(void 0);

    const result = await autheticationService.recoverPasswordCode(email, code);
    expect(result).toBeUndefined();
  });

  it('[recoverPasswordCode] should throw BadRequestError due to incorrect recovery code', async () => {
    const email = "rrl3@cin.ufpe.br";
    const code = '0007';

    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockedUser); 
    jest.spyOn(userService, 'updateUserById').mockResolvedValue(void 0);

    expect(async () => { await autheticationService.recoverPasswordCode(email, code)}).rejects.toThrow(BadRequestError);
  });

  it('[resetPassword] should allow the user to define a new password', async () => {
    const email = "rrl3@cin.ufpe.br";
    const password = 'baunilh0';
    let updatedUser = mockedUser;
    updatedUser.password = password;

    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockedUser); 
    jest.spyOn(userService, 'getUserById').mockResolvedValue(updatedUser);

    const result = await autheticationService.resetPassword(email, password);
    expect(result).toBeUndefined();
  });

  it('[resetPassword] should throw BadRequestError due to invalid password format', async () => {
    const email = "rrl3@cin.ufpe.br";
    const password = 'error';
    let updatedUser = mockedUser;
    updatedUser.password = password;

    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockedUser); 
    jest.spyOn(userService, 'getUserById').mockResolvedValue(updatedUser);

    expect(async () => { await autheticationService.resetPassword(email, password)}).rejects.toThrow(BadRequestError);
  });
});