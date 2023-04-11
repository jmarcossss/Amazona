import Injector from '../../src/di/injector';
import { di } from '../../src/di/index';
import { NotFoundError, BadRequestError, InternalServerError } from '../../src/utils/errors/http.error';
import NotificationService from '../../src/services/notification.service';
import NotificationRepository from '../../src/repositories/notification.repository';
import NotificationEntity from '../../src/entities/notification.entity';
import NotificationModel from '../../src/models/notification.model';
import EmailService from '../../src/services/email.service';
import UserService from '../../src/services/user.service';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let notificationRepository: NotificationRepository;
  let userService: UserService;
  let injector: Injector = di;

  const mockedUserId: string = "ce6f5c66-1967-4b21-9929-51ca7d652151"
  const mockedDate: string = "2023-01-29T06:00:00Z"
  const mockedNotDate: string = "2011-03-21T06:00:00Z"
  
  const mockedNotification = new NotificationEntity({
    id: "f8fbe843-db01-40af-8585-fdf5473b7212",
		title: "Notification 1",
		description: "This is the notification 1",
		orderId: "b9c4a338-e19e-4bfa-bc83-45171017407c",
		userId: mockedUserId,
		date: mockedDate
  });
  const mockedNotificationModel = new NotificationModel({
    id: "f8fbe843-db01-40af-8585-fdf5473b7212",
		title: "Notification 1",
		description: "This is the notification 1",
		orderId: "b9c4a338-e19e-4bfa-bc83-45171017407c",
		userId: mockedUserId,
		date: new Date(mockedDate)
  });
  const newMockedNotification = new NotificationEntity({
    title: "Notification 2",
    description: "This is the notification 2",
    orderId: "b9c4a338-e19e-4bfa-bc83-45171017407c",
    userId: mockedUserId,
    date: "2021-01-29T06:00:00.000Z",
  });
  const mockedNotifications: NotificationEntity[] = [mockedNotification]
  const mockedNotificationsModel: NotificationModel[] = [mockedNotificationModel]
  const userMocked = new UserEntity({
    id: mockedUserId,
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
    injector.registerRepository(NotificationRepository, new NotificationRepository());
    notificationRepository = injector.getRepository(NotificationRepository);

    injector.registerRepository(UserRepository, new UserRepository())
    let userRepository = injector.getRepository(UserRepository);
    
    injector.registerService(UserService, new UserService(userRepository))
    userService = injector.getService(UserService);
    
    injector.registerService(NotificationService, new NotificationService(notificationRepository, 
                             userService));

    notificationService = injector.getService(NotificationService);
  });

  it('[getNotifications] should get notifications by a userId', async () => {
    jest.spyOn(notificationRepository, 'getNotifications').mockResolvedValue(mockedNotifications);

    const result = await notificationService.getNotifications(mockedUserId);
    expect(result).toEqual(mockedNotificationsModel);
  });

  it('[getNotifications] should get notifications by a userId and a specific date', async () => {
    jest.spyOn(notificationRepository, 'getNotifications').mockResolvedValue(mockedNotifications);

    const result = await notificationService.getNotifications(mockedUserId, mockedDate);
    expect(result).toEqual(mockedNotificationsModel);
  });

  it('[getNotifications] should get notifications by a userId and a specific date that does not exist', async () => {
    jest.spyOn(notificationRepository, 'getNotifications').mockResolvedValue(mockedNotifications);

    const result = await notificationService.getNotifications(mockedUserId, mockedNotDate);
    expect(result).toEqual([]);
  });

  it('[createNotification] should creat a notification', async () => {
    jest.spyOn(notificationRepository, 'createNotification').mockResolvedValue(newMockedNotification);
    jest.spyOn(userService, 'getUserById').mockResolvedValue(userMocked)
    jest.spyOn(EmailService, 'sendEmail').mockResolvedValue(void 0);

    const result = await notificationService.createNotification(newMockedNotification);
    expect(result).toBeUndefined();
  });

  it('[createNotification] throw a BadRequestError due the repository return undefined', async () => {
    jest.spyOn(notificationRepository, 'createNotification').mockResolvedValue(undefined);
    jest.spyOn(EmailService, 'sendEmail').mockResolvedValue(void 0);

    expect(async () => { await notificationService.createNotification(newMockedNotification)}).rejects.toThrow(BadRequestError);
  });
});