import UserModel from '../../src/models/user.model';
import app from '../../src/app';
import supertest from 'supertest';
const request = supertest(app);
import EmailService from '../../src/services/email.service';

describe('AuthenticationController', () => {
  const mockedUserPassword = {password: "abcdef12"};
  const mockedUser: UserModel = new UserModel({
    id: "ce6f5c66-1967-4b21-9929-51ca7d652151",
    CPF: "12989087064",
    name: "Clara Acrucha",
    username: "acrucha",
    email: "acrucha@mail.com",
    payment: "PIX",
    address: ["Avenida Acrucha 5"],
    phone: "999789923"
  });

  it('[POST] /api/authentication/sign-in should receive an incorrect_credentials error message ', async () => {
    const signInData = {email: "email@mail.com", password: mockedUserPassword.password};
    const response = await request.post('/api/authentication/sign-in').send(signInData);
    const result = response.body.msgCode;

    expect(result).toEqual('incorrect_credentials');
  });

  it('[POST] /api/authentication/sign-in should receive incorrect_password error message ', async () => {
    const signInData = {email: mockedUser.email, password: "error321"};
    const response = await request.post('/api/authentication/sign-in').send(signInData);
    const result = response.body.msgCode;

    expect(result).toEqual('incorrect_password');
  });

  it('[POST] /api/authentication/sign-in should sign in an user', async () => {
    const signInData = {email: mockedUser.email, password: mockedUserPassword.password}
    const response = await request.post('/api/authentication/sign-in').send(signInData);
    const result = response.body.data;

    expect(result).toEqual(mockedUser);
  });

  it('[POST] /api/authentication/sign-up should receive messages error due to already used data', async () => {
    const newMockedUser = {
      CPF: "12989087064",
      name: "Sophia Moraes",
      username: "pampam", 
      email: "pam@mail.com",
      password: "baunilh0",
      payment: "PIX",
      address: [],
      phone: "",
      code: "" 
    };
    
    const error = [
      "already_registered",
      "email_unavailable",
      "username_unavailable"
    ];
    
    const response = await request.post('/api/authentication/sign-up').send(newMockedUser);
    const result = response.body.msgCode;
    
    expect(result).toEqual(error);
  });

  it('[POST] /api/authentication/sign-up should receive messages error due to data invalid format', async () => {
    const newMockedUser = {
      CPF: "error",
      name: "Sophia Moraes",
      username: "sophie", 
      email: "error",
      password: "error",
      payment: "PIX",
      address: [],
      phone: "",
      code: ""
    };

    const error = [
      "CPF_invalid_format",
      "email_invalid_format",
      "password_invalid_format"
    ]

    const response = await request.post('/api/authentication/sign-up').send(newMockedUser);
    const result = response.body.msgCode;
    
    expect(result).toEqual(error);
  });

  it('[POST] /api/authentication/sign-up should sign up an user', async () => {
    const newMockedUser = {
        CPF: "00042123411",
        name: "Sophia Moraes", 
        username: "sophie", 
        email: "sophia@mail.com", 
        password: "baunilh0",
        payment: "PIX",
        address: [],
        phone: "",
        code: ""
    };
    const response = await request.post('/api/authentication/sign-up').send(newMockedUser);
    const result = response.body.msgCode;

    expect(result).toEqual('success');
  });

  it('[POST] /api/authentication/sign-up/recover-password should receive user_not_found message error', async () => {
    const email = {email: "email@mail.com"};
    jest.spyOn(EmailService, 'sendEmail').mockResolvedValue(void 0);
    const response = await request.post('/api/authentication/sign-up/recover-password').send(email);
    const result = response.body.msgCode;

    expect(result).toEqual('user_not_found');
  });

  it('[POST] /api/authentication/sign-up/recover-password/code should receive incorrect_recovery_code message error', async () => {
    const recoverPasswordCodeData = {email: mockedUser.email, code: "error"};
    const response = await request.post('/api/authentication/sign-up/recover-password/code').send(recoverPasswordCodeData);
    const result = response.body.msgCode;

    expect(result).toEqual('incorrect_recovery_code');
  });

  it('[POST] /api/authentication/sign-up/recover-password/code should allow password reset operation', async () => {
    const recoverPasswordData = {email: mockedUser.email, code: ""};
    const response = await request.post('/api/authentication/sign-up/recover-password/code').send(recoverPasswordData);
    const result = response.body.msgCode;

    expect(result).toEqual('success');
  });

  it('[PUT] /api/authentication/recover-password/reset should receive password_invalid_format message error', async () => {
     const resetPasswordData = {email: mockedUser.email, password: "error"};
     const response = await request.put('/api/authentication/sign-up/recover-password/reset').send(resetPasswordData);
     const result = response.body.msgCode;
    
     expect(result).toEqual('password_invalid_format');
  });

  it('[PUT] /api/authentication/sign-up/recover-password/reset should update the password', async () => {
     const resetPasswordData = {email: mockedUser.email, password: "21cdef12"};
     const response = await request.put('/api/authentication/sign-up/recover-password/reset').send(resetPasswordData);
     const result = response.body.msgCode;
    
     expect(result).toEqual('success');
  });
});