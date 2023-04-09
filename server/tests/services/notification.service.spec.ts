import Injector from '../../src/di/injector';
import { di } from '../../src/di/index';
import { NotFoundError, BadRequestError, InternalServerError } from '../../src/utils/errors/http.error';
import NotificationService from '../../src/services/notification.service';
import NotificationRepository from '../../src/repositories/notification.repository';
import NotificationEntity from '../../src/entities/notification.entity';
import NotificationModel from '../../src/models/notification.model';
import UserRepository from '../../src/repositories/user.repository';
import UserService from '../../src/services/user.service';

describe.skip('NotificationService', () => {
  let notificationService: NotificationService
  let userService: UserService
  let notificationRepository: NotificationRepository;
  let injector: Injector = di;
  const mockedUserId: string = "874aba1f-893f-4fad-909b-6def1646d11b"
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
  
  beforeEach(() => {
    injector.registerRepository(NotificationRepository, new NotificationRepository());
    notificationRepository = injector.getRepository(NotificationRepository);

    injector.registerRepository(UserRepository, new UserRepository());
    let userRepository = injector.getRepository(UserRepository);

    injector.registerService(UserService, new UserService(userRepository));
    userService = injector.getRepository(UserService);

    injector.registerService(NotificationService, new NotificationService(notificationRepository, userService));
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

    const result = await notificationService.createNotification(newMockedNotification);
    expect(result).toBeUndefined();
  });

  it('[createNotification] throw a BadRequestError due the repository return undefined', async () => {
    jest.spyOn(notificationRepository, 'createNotification').mockResolvedValue(undefined);

    expect(async () => { await notificationService.createNotification(newMockedNotification)}).rejects.toThrow(BadRequestError);
  });
});