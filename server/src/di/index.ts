import BrandRepository from '../repositories/brand.repository';
import NotificationRepository from '../repositories/notification.repository';
import OrderStatusRepository from '../repositories/order-status.repository';
import OrderRepository from '../repositories/order.repository';
import ProductCategoriesRepository from '../repositories/product-categories.repository';
import ProductRepository from '../repositories/product.repository';
import SectorRepository from '../repositories/sector.repository';
import UserRepository from '../repositories/user.repository';
import AuthenticationService from '../services/authentication.service';
import BrandService from '../services/brand.service';
import NotificationService from '../services/notification.service';
import OrderStatusService from '../services/order-status.service';
import OrderService from '../services/order.service';
import ProductCategoriesService from '../services/product-categories.service';
import ProductService from '../services/product.service';
import SectorService from '../services/sector.service';
import UserService from '../services/user.service';
import Injector from './injector';

export const di = new Injector();

// User
di.registerRepository(UserRepository, new UserRepository());
di.registerService(
  UserService,
  new UserService(di.getRepository(UserRepository))
);

// Authentication
di.registerService(
  AuthenticationService,
  new AuthenticationService(di.getRepository(UserRepository))
);

// Order
di.registerRepository(OrderRepository, new OrderRepository());
di.registerService(
  OrderService,
  new OrderService(di.getRepository(OrderRepository))
);

// Order Status
di.registerRepository(OrderStatusRepository, new OrderStatusRepository());
di.registerService(
  OrderStatusService,
  new OrderStatusService(di.getRepository(OrderStatusRepository))
);

// Notification
di.registerRepository(NotificationRepository, new NotificationRepository());
di.registerService(
  NotificationService,
  new NotificationService(di.getRepository(NotificationRepository))
);

// Sector
di.registerRepository(SectorRepository, new SectorRepository());
di.registerService(
  SectorService,
  new SectorService(di.getRepository(SectorRepository))
);

// Brand
di.registerRepository(BrandRepository, new BrandRepository());
di.registerService(
  BrandService,
  new BrandService(
    di.getRepository(BrandRepository),
    di.getService(SectorService)
  )
);

// Product Category
di.registerRepository(
  ProductCategoriesRepository,
  new ProductCategoriesRepository()
);
di.registerService(
  ProductCategoriesService,
  new ProductCategoriesService(di.getRepository(ProductCategoriesRepository))
);

// Product
di.registerRepository(ProductRepository, new ProductRepository());
di.registerService(
  ProductService,
  new ProductService(
    di.getRepository(ProductRepository),
    di.getService(BrandService),
    di.getService(ProductCategoriesService)
  )
);
