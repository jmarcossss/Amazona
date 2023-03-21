import { Express, Router } from 'express';
import AuthenticationController from '../controllers/authentication.controller';
import BrandController from '../controllers/brand.controller';
import NotificationController from '../controllers/notification.controller';
import OrderController from '../controllers/order.controller';
import OrderStatusController from '../controllers/order-status.controller';
import ProductCategoriesController from '../controllers/product-categories.controller';
import ProductController from '../controllers/product.controller';
import SectorController from '../controllers/sector.controller';
import UserController from '../controllers/user.controller';
import { di } from '../di';
import AuthenticationService from '../services/authentication.service';
import BrandService from '../services/brand.service';
import NotificationService from '../services/notification.service';
import OrderService from '../services/order.service';
import OrderStatusService from '../services/order-status.service';
import ProductCategoriesService from '../services/product-categories.service';
import ProductService from '../services/product.service';
import SectorService from '../services/sector.service';
import UserService from '../services/user.service';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new UserController(router, di.getService(UserService)).router
  );
  app.use(
    prefix,
    new AuthenticationController(router, di.getService(AuthenticationService))
      .router
  );
  app.use(
    prefix,
    new OrderController(router, di.getService(OrderService)).router
  );
  app.use(
    prefix,
    new OrderStatusController(router, di.getService(OrderStatusService)).router
  );
  app.use(
    prefix,
    new NotificationController(router, di.getService(NotificationService))
      .router
  );
  app.use(
    prefix,
    new ProductController(router, di.getService(ProductService)).router
  );
  app.use(
    prefix,
    new BrandController(router, di.getService(BrandService)).router
  );
  app.use(
    prefix,
    new SectorController(router, di.getService(SectorService)).router
  );
  app.use(
    prefix,
    new ProductCategoriesController(
      router,
      di.getService(ProductCategoriesService)
    ).router
  );
};
