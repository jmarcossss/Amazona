import UserService from '../../src/services/user.service';
import OrderService from '../../src/services/order.service';
import AuthenticationService from '../../src/services/authentication.service';
import Injector from '../../src/di/injector';
import { di } from '../../src/di/index';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';
import OrderRepository from '../../src/repositories/order.repository';
import { NotFoundError, BadRequestError, InternalServerError } from '../../src/utils/errors/http.error';
import OrderEntity from '../../src/entities/order.entity';
import ProductService from '../../src/services/product.service';
import NotificationService from '../../src/services/notification.service';
import SectorRepository from '../../src/repositories/sector.repository';
import BrandRepository from '../../src/repositories/brand.repository';
import ProductCategoriesRepository from '../../src/repositories/product-categories.repository';

describe('UserService', () => {
  let orderRepository: OrderRepository;
  let orderService: OrderService
  let productService: ProductService;
  let NotificationService: NotificationService
  let injector: Injector = di;
  const mockedOrder = new OrderEntity({
    id: "b9c4a338-e19e-4bfa-bc83-45171017407c",
    userId: "ce6f5c66-1967-4b21-9929-51ca7d652151",
    totalValue: "600",
    purchaseDate: "2023-01-29T06:00:00Z",
    statusHistory: [
      {
        id: "c1894648-0e07-48b2-b988-b05ed49c9aa6",
        statusId: "f307102d-698b-4ad5-adf6-de7281243583",
        date: "2023-01-29T06:00:00Z"
      },
      {
        id: "042045ac-b6a5-4e0b-8f80-cb85d823af8d",
        statusId: "8bbb7b46-17d6-4df3-8171-0003814e3812",
        date: "2023-01-29T08:00:00Z"
      }
    ],
    productsIds: [
      "a66807c2-d202-4b7e-853d-f2c5bfbb2f6f"
    ],
    address: "Endereco tal",
    payment: "pix"
  });
  const newMockedOrder = new OrderEntity({
    id: "",
    userId: "2",
    totalValue: "900",
    purchaseDate: "2022-02-29T02:00:00Z",
    statusHistory: [
      {
        id: "2",
        statusId: "8bbb7b46-17d6-4df3-8171-0003814e3812",
        date: "2022-02-29T02:00:00Z"
      }
    ],
    productsIds: [
      "a66807c2-d202-4b7e-853d-f2c5bfbb2f6f"
    ],
    address: "Aniceto Varejão",
    payment: "credCard"
  
  });
  const mockedOrders: OrderEntity[] = [mockedOrder]

/*   beforeEach(() => {
    injector.registerRepository(OrderRepository, new OrderRepository());
    orderRepository = injector.getRepository(OrderRepository);
    
    injector.registerRepository(SectorRepository, new SectorRepository());
    sectorRepository = injector.getRepository(SectorRepository);
    
    injector.registerRepository(BrandRepository, new BrandRepository());
    brandRepository = injector.getRepository(BrandRepository);
    
    injector.registerRepository(ProductCategoriesRepository, new ProductCategoriesRepository());
    productCategoriesRepository = injector.getRepository(ProductCategoriesRepository);
    
    injector.registerRepository(SectorRepository, new SectorRepository());
    sectorRepository = injector.getRepository(SectorRepository);
    
    injector.registerRepository(SectorRepository, new SectorRepository());
    sectorRepository = injector.getRepository(SectorRepository);
    

    injector.registerService(OrderService, new OrderService(orderRepository));
    orderService = injector.getService(OrderService);
  });

  it('[signIn] should sign in an user using email', async () => {
    const user = new UserEntity({email: "rrl3@cin.ufpe.br", password: "1234567a"});
    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers);

    const result = await autheticationService.signIn(user);
    expect(result).toEqual(mockedUser);
  });
 */
  /* it('[signIn] should sign in an user using username', async () => {
    const user = new UserEntity({username: "rafinha", password: "1234567a"});
    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers);

    const result = await autheticationService.signIn(user);
    expect(result).toEqual(mockedUser);
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

    const result = await autheticationService.signUpValidation(newMockedUser);
    expect(result).toBeUndefined();
  });

  it('[signUpValidation] should throw BadRequestError due CPF, email and password invalid format', async () => {
    const user = new UserEntity({
      CPF: "error123",
      name: "Sophia Moraes",
      username: "sophie", 
      email: "sophie",
      password: "error321",
      payment: "PIX",
      address: [],
      phone: "",
      code: ""
    })

    jest.spyOn(userRepository, 'getUsers').mockResolvedValue(mockedUsers);

    const result = await autheticationService.signUpValidation(newMockedUser);
    expect(result).toBeUndefined();
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
  }); */
});