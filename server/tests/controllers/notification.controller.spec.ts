import app from '../../src/app';

import supertest from 'supertest';
import NotificationModel from '../../src/models/notification.model';
import NotificationEntity from '../../src/entities/notification.entity';

const request = supertest(app);

describe.skip('NotificationController', () => {
  const mockedUserId: string = "874aba1f-893f-4fad-909b-6def1646d11b";
  const mockedOrderId: string = "b9c4a338-e19e-4bfa-bc83-45171017407c";
  const mockedDate: string = "2023-01-29T06:00:00Z"
  const mockedNotDate: string = "2025-03-21T06:00:00Z"
  
  const mockedNotification: NotificationModel = new NotificationModel({
    id: "f8fbe843-db01-40af-8585-fdf5473b7212",
    title: "Notification 1",
    description: "This is the notification 1",
    orderId: mockedOrderId,
    date: new Date("2023-01-29T06:00:00.000Z"),
    userId: mockedUserId,
  });
  const newmockedNotification: NotificationEntity = new NotificationEntity({
    title: "Notification 2",
    description: "This is the notification 2",
    orderId: mockedOrderId,
    date: "2021-01-29T06:00:00.000Z",
    userId: mockedUserId,
  })
  const mockedNotificationArray: NotificationModel[] = [mockedNotification]
  
  it('[GET] /api/notifications/user/:userId should return the Notifications by an userId', async () => {
    const response = await request.get(`/api/notifications/user/${mockedUserId}`).send();
    const result: NotificationModel[] = response.body.data;
    const finalResult = result.map((order) => {
      return {
        ...order,
        date: new Date(order.date)
      } as NotificationModel
    })
    expect(finalResult).toEqual(mockedNotificationArray);
  });
  it('[GET] /api/notifications/user/:userId?date=2023-01-29T06:00:00Z should return the Notifications by an userId whith this date', async () => {
    const response = await request.get(`/api/notifications/user/${mockedUserId}?date=${encodeURIComponent(mockedDate)}`).send();
    const result: NotificationModel[] = response.body.data;
    const finalResult = result.map((order) => {
      return {
        ...order,
        date: new Date(order.date)
      } as NotificationModel
    })
    expect(finalResult).toEqual(mockedNotificationArray);
  });
  it('[GET] /api/notifications/user/:userId?date=2025-03-21T06:00:00Z should return the empty array notifications if the user does not have a notification whith this date', async () => {
    const response = await request.get(`/api/notifications/user/${mockedUserId}?date=${encodeURIComponent(mockedNotDate)}`).send();
    const result: NotificationModel[] = response.body.data;
    const finalResult = result.map((order) => {
      return {
        ...order,
        date: new Date(order.date)
      } as NotificationModel
    })
    expect(finalResult).toEqual([]);
  });
  it('[POST] /api/notifications should create an notification', async () => {
    const response = await request.post('/api/notifications').send(newmockedNotification);
    const result: string = response.body.msgCode;
    expect(result).toEqual('success');
  });
});