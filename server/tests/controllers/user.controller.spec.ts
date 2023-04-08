import UserModel from '../../src/models/user.model';
import app from '../../src/app';

import supertest from 'supertest';

const request = supertest(app);

describe('UserController', () => {
  const mockedUserId: string = "ce6f5c66-1967-4b21-9929-51ca7d652151";
  const mockedUserPassword = {password: "abcdef12"};
  const mockedUser: UserModel = new UserModel({
    id: mockedUserId,
    CPF: "12989087064",
    name: "Clara Acrucha",
    username: "acrucha",
    email: "acrucha@mail.com",
    payment: "PIX",
    address: ["Avenida Acrucha 5"],
    phone: "999789923"
  });

  it('[GET] /api/users/:id should return an user by id', async () => {
    const response = await request.get('/api/users/' + mockedUserId).send();
    const result: UserModel = response.body.data;

    expect(result).toEqual(mockedUser);
  });

  it('[PUT] /api/users/:id should update an user by id', async () => {
    const updatedMockedUser = {
      id: mockedUserId,
      CPF: "12989087064",
      name: "Clarao",
      username: "clarao",
      email: "clarao@mail.com",
      payment: "PIX",
      address: ["Avenida Acrucha 42"],
      phone: "999789923"
    };
  
    const response = await request.put('/api/users/' + mockedUserId).send(updatedMockedUser);
    const result = response.body.msgCode;

    expect(result).toEqual('success');
  });

  it('[DELETE] /api/users/:id should receive incorrect_password error message', async () => {
    const password = {password: "error321"}
    const response = await request.delete('/api/users/' + mockedUserId).send(password);
    const result = response.body.msgCode;

    expect(result).toEqual('incorrect_password');
  });

  it('[DELETE] /api/users/:id should delete an user by id', async () => {
    const response = await request.delete('/api/users/' + mockedUserId).send(mockedUserPassword);
    const result = response.body.msgCode;

    expect(result).toEqual('success');
  });
});