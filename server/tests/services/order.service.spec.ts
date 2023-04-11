import OrderService from '../../src/services/order.service';
import Injector from '../../src/di/injector';
import { di } from '../../src/di/index';
import OrderRepository from '../../src/repositories/order.repository';
import { NotFoundError, BadRequestError, InternalServerError } from '../../src/utils/errors/http.error';
import OrderEntity from '../../src/entities/order.entity';
import ProductService from '../../src/services/product.service';
import NotificationService from '../../src/services/notification.service';
import SectorRepository from '../../src/repositories/sector.repository';
import BrandRepository from '../../src/repositories/brand.repository';
import ProductCategoriesRepository from '../../src/repositories/product-categories.repository';
import ProductRepository from '../../src/repositories/product.repository';
import OrderStatusRepository from '../../src/repositories/order-status.repository';
import NotificationRepository from '../../src/repositories/notification.repository';
import SectorService from '../../src/services/sector.service';
import BrandService from '../../src/services/brand.service';
import ProductCategoriesService from '../../src/services/product-categories.service';
import OrderStatusService from '../../src/services/order-status.service';
import OrderStatusItemEntity from '../../src/entities/order-status-item.entity';
import OrderModel from '../../src/models/order.model';
import UserEntity from '../../src/entities/user.entity';
import UserRepository from '../../src/repositories/user.repository';
import UserService from '../../src/services/user.service';
import EmailService from '../../src/services/email.service';
import OrderStatusItemModel from '../../src/models/order-status-item.model';
import ProductModel from '../../src/models/product.model';


describe.skip('OrderService', () => {
  // repositories
  let sectorRepository: SectorRepository;
  let brandRepository: BrandRepository;
  let productCategoriesRepository: ProductCategoriesRepository;
  let productRepository: ProductRepository;
  let orderStatusRepository: OrderStatusRepository;
  let notificationRepository: NotificationRepository;
  let orderRepository: OrderRepository;
  
  // services
  let sectorService: SectorService;
  let brandService: BrandService;
  let productCategoriesService: ProductCategoriesService;
  let productService: ProductService;
  let orderStatusService: OrderStatusService;
  let notificationService: NotificationService;
  let orderService: OrderService;

  let injector: Injector = di;
  const mockedUserId: string = "ce6f5c66-1967-4b21-9929-51ca7d652151"
  const mockedOrderId: string = "b9c4a338-e19e-4bfa-bc83-45171017407c"
  const mockedProductName: string = "Camisa Adidas"
  const mockedNotProductName: string = "CamisaQueNaoExiste"
  const mockedMultipleStatus: string = "[confirmed, in transit]"
  const mockedInitialDate: string = "2022-01-29T06:00:00.000Z"
  const mockedEndDate: string = "2024-01-29T06:00:00.000Z"
  const mockedOrderStatusItem: OrderStatusItemEntity = {
    id: "dcd181e7-6edc-441c-8c4e-97795303747e",
    statusId: "0fc0ea4f-840a-4a45-b657-1a364fb4fe72",
	  date: "2023-01-29T06:00:20Z"
  }
  const mockedUpdatedOrder = new OrderEntity({
    id: mockedOrderId,
    userId: mockedUserId,
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
      },
      {
        id: "dcd181e7-6edc-441c-8c4e-97795303747e",
        statusId: "0fc0ea4f-840a-4a45-b657-1a364fb4fe72",
        date: "2023-01-29T06:00:20Z"
      }
    ],
    productsIds: [
      "a66807c2-d202-4b7e-853d-f2c5bfbb2f6f"
    ],
    address: "Endereco tal",
    payment: "pix"
  });
  
  const mockedOrder = new OrderEntity({
    id: mockedOrderId,
    userId: mockedUserId,
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
  const mockedOrderModel = new OrderModel({
    id: mockedOrderId,
    userId: mockedUserId,
    totalValue: "600",
    purchaseDate: new Date("2023-01-29T06:00:00.000Z"),
    statusHistory: [
      {
        id: "c1894648-0e07-48b2-b988-b05ed49c9aa6",
        status: {
          id: "f307102d-698b-4ad5-adf6-de7281243583",
          status: "in transit"
        },
        date: "2023-01-29T06:00:00Z"
      },
      {
        id: "042045ac-b6a5-4e0b-8f80-cb85d823af8d",
        status: {
          id: "8bbb7b46-17d6-4df3-8171-0003814e3812",
          status: "confirmed"
        },
        date: "2023-01-29T08:00:00Z"
      }
    ],
    products: [
      {
        id: "a66807c2-d202-4b7e-853d-f2c5bfbb2f6f",
        name: "Camisa Adidas",
        brand: {
          id: "e92cf80c-de73-4cf8-8f09-579efa669dd8",
          name: "Adidas",
          sector: {
            id: "8d271874-f125-469a-9013-c0764713937b",
            name: "sporting_goods"
          }
        },
        value: "200",
        productCategory: {
          id: "94582aca-7715-4ad7-b855-bdaad2b2899e",
          name: "clothing"
        }
      }
    ],
    address: "Endereco tal",
    payment: "pix"
  });

  const newMockedOrder = new OrderEntity({
    id: "",
    userId: mockedUserId,
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
  const mockedOrdersModel: OrderModel[] = [mockedOrderModel]
  const userMocked = new UserEntity({
    id: "ce6f5c66-1967-4b21-9929-51ca7d652151",
    CPF: "12989087064",
    name: "Clara Acrucha",
    username: "acrucha",
    email: "acrucha@mail.com",
    password: "abcdef12",
    payment: "PIX",
    address: [
        "Avenida Acrucha 5"
    ],
    phone: "999789923",
    code: ""
  });

  beforeEach(() => {
    //repositories
    injector.registerRepository(SectorRepository, new SectorRepository());
    sectorRepository = injector.getRepository(SectorRepository);
    
    injector.registerRepository(BrandRepository, new BrandRepository());
    brandRepository = injector.getRepository(BrandRepository);
    
    injector.registerRepository(ProductCategoriesRepository, new ProductCategoriesRepository());
    productCategoriesRepository = injector.getRepository(ProductCategoriesRepository);
    
    injector.registerRepository(ProductRepository, new ProductRepository());
    productRepository = injector.getRepository(ProductRepository);
    
    injector.registerRepository(OrderStatusRepository, new OrderStatusRepository());
    orderStatusRepository = injector.getRepository(OrderStatusRepository);
    
    injector.registerRepository(NotificationRepository, new NotificationRepository());
    notificationRepository = injector.getRepository(NotificationRepository);
    
    injector.registerRepository(OrderRepository, new OrderRepository());
    orderRepository = injector.getRepository(OrderRepository);

    injector.registerRepository(UserRepository, new UserRepository())
    let userRepository = injector.getRepository(UserRepository);
    
    //Services
    injector.registerService(SectorService, new SectorService(sectorRepository));
    sectorService = injector.getService(SectorService);
    
    injector.registerService(BrandService, new BrandService(brandRepository, sectorService));
    brandService = injector.getService(BrandService);
    
    injector.registerService(ProductCategoriesService, new ProductCategoriesService(productCategoriesRepository));
    productCategoriesService = injector.getService(ProductCategoriesService);
    
    injector.registerService(ProductService, new ProductService(productRepository, brandService, productCategoriesService));
    productService = injector.getService(ProductService);
    
    injector.registerService(OrderStatusService, new OrderStatusService(orderStatusRepository));
    orderStatusService = injector.getService(OrderStatusService);

    injector.registerService(UserService, new UserService(userRepository))
    let userService = injector.getService(UserService);

    injector.registerService(NotificationService, new NotificationService(notificationRepository, userService));
    notificationService = injector.getService(NotificationService);
    
    injector.registerService(OrderService, new OrderService(orderRepository, orderStatusService, productService, notificationService));
    orderService = injector.getService(OrderService);
  });
  

  it('[getAllOrderByUserId] should return all orders by a user Id', async () => {
    jest.spyOn(orderRepository, 'getOrder').mockResolvedValue(mockedOrders);

    const result = await orderService.getAllOrderByUserId(mockedUserId);
    expect(result).toEqual(mockedOrdersModel);
  });

  it('[getOrderById] should return a order by Id', async () => {
    jest.spyOn(orderRepository, 'getOrderById').mockResolvedValue(mockedOrder);
    
    const result = await orderService.getOrderById(mockedOrderId);
    expect(result).toEqual(mockedOrderModel);
  });

  it('[getOrderById] throw a NotFoundError due the repository return undefined', async () => {
    jest.spyOn(orderRepository, 'getOrderById').mockResolvedValue(undefined);

    expect(async () => { await orderService.getOrderById(mockedOrderId)}).rejects.toThrow(NotFoundError);
  });

  it('[createOrder] should creat a order', async () => {
    jest.spyOn(orderRepository, 'createOrder').mockResolvedValue(newMockedOrder);
    jest.spyOn(EmailService, 'sendEmail').mockResolvedValue(void 0);
    
    const result = await orderService.createOrder(newMockedOrder);
    expect(result).toBeUndefined();
  });

  it('[createOrder] throw a BadRequestError due the repository return undefined', async () => {
    jest.spyOn(orderRepository, 'createOrder').mockResolvedValue(undefined);

    expect(async () => { await orderService.createOrder(newMockedOrder)}).rejects.toThrow(BadRequestError);
  });

  it('[addOrderStatusById] should update a order creating a status order in the historyStatus', async () => {
    jest.spyOn(orderRepository, 'getOrderById').mockResolvedValue(mockedOrder);
    jest.spyOn(orderRepository, 'updateOrder').mockResolvedValue(mockedUpdatedOrder);

    const result = await orderService.addOrderStatusById(mockedOrderId, mockedOrderStatusItem);
    expect(result).toBeUndefined();
  });

  it('[addOrderStatusById] throw a NotFoundError due the repository return undefined in getOrderById', async () => {
    jest.spyOn(orderRepository, 'getOrderById').mockResolvedValue(undefined);
    jest.spyOn(orderRepository, 'updateOrder').mockResolvedValue(mockedUpdatedOrder);

    expect(async () => { await orderService.addOrderStatusById(mockedOrderId, mockedOrderStatusItem)}).rejects.toThrow(NotFoundError);
  });

  it('[addOrderStatusById] throw a BadRequestError due the repository return undefined in updateOrder', async () => {
    jest.spyOn(orderRepository, 'getOrderById').mockResolvedValue(mockedOrder);
    jest.spyOn(orderRepository, 'updateOrder').mockResolvedValue(undefined);

    expect(async () => { await orderService.addOrderStatusById(mockedOrderId, mockedOrderStatusItem)}).rejects.toThrow(BadRequestError);
  });

  it('[getHistoryByUserId] should get orders by a userId', async () => {
    jest.spyOn(orderService, 'getAllOrderByUserId').mockResolvedValue(mockedOrdersModel);
    
    const result = await orderService.getHistoryByUserId(mockedUserId, undefined, undefined, undefined, undefined);
    expect(result).toEqual(mockedOrdersModel);
  });

  it('[getHistoryByUserId] should get orders by a userId with a specific product name', async () => {
    jest.spyOn(orderService, 'getAllOrderByUserId').mockResolvedValue(mockedOrdersModel);
    
    const result = await orderService.getHistoryByUserId(mockedUserId, undefined, mockedProductName, undefined, undefined);
    expect(result).toEqual(mockedOrdersModel);
  });

  it('[getHistoryByUserId] should get orders empty by a userId with a specific product name that does not exist', async () => {
    jest.spyOn(orderService, 'getAllOrderByUserId').mockResolvedValue(mockedOrdersModel);
    
    const result = await orderService.getHistoryByUserId(mockedUserId, undefined, mockedNotProductName, undefined, undefined);
    expect(result).toEqual([]);
  });
  it('[getHistoryByUserId] should get orders by a userId with specific multiple status', async () => {
    jest.spyOn(orderService, 'getAllOrderByUserId').mockResolvedValue(mockedOrdersModel);
    
    const result = await orderService.getHistoryByUserId(mockedUserId, mockedMultipleStatus, undefined, undefined, undefined);
    expect(result).toEqual(mockedOrdersModel);
  });
  it('[getHistoryByUserId] should get orders by a userId with a specific product name and multiple status', async () => {
    jest.spyOn(orderService, 'getAllOrderByUserId').mockResolvedValue(mockedOrdersModel);
    
    const result = await orderService.getHistoryByUserId(mockedUserId, mockedMultipleStatus, mockedProductName, undefined, undefined);
    expect(result).toEqual(mockedOrdersModel);
  });
  it('[getHistoryByUserId] should get orders by a userId with a purchaseDate between between initialDate and endDate', async () => {
    jest.spyOn(orderService, 'getAllOrderByUserId').mockResolvedValue(mockedOrdersModel);
    
    const result = await orderService.getHistoryByUserId(mockedUserId, undefined, undefined, mockedInitialDate, mockedEndDate);
    expect(result).toEqual(mockedOrdersModel);
  });
  it('[getHistoryByUserId] should get orders by a userId with a specific product name and a purchaseDate between between initialDate and endDate', async () => {
    jest.spyOn(orderService, 'getAllOrderByUserId').mockResolvedValue(mockedOrdersModel);
    
    const result = await orderService.getHistoryByUserId(mockedUserId, undefined, mockedProductName, mockedInitialDate, mockedEndDate);
    expect(result).toEqual(mockedOrdersModel);
  });
  it('[getHistoryByUserId] should get orders by a userId with a specific product name, a purchaseDate between between initialDate and endDate and multiple status', async () => {
    jest.spyOn(orderService, 'getAllOrderByUserId').mockResolvedValue(mockedOrdersModel);
    
    const result = await orderService.getHistoryByUserId(mockedUserId, mockedMultipleStatus, mockedProductName, mockedInitialDate, mockedEndDate);
    expect(result).toEqual(mockedOrdersModel);
  });
});