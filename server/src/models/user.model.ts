import OrderEntity from '../entities/order.entity';
import BaseModel from './base.model';

class UserModel extends BaseModel {
  CPF: string;
  name: string;
  username: string;
  email: string;
  payment: string;
  address: string[];
  phone: string;
  code: string;

  constructor({ 
    id,
    CPF, 
    name, 
    username,
    email,
    payment, 
    address, 
    phone,
    code
  } : { 
    id: string,
    CPF: string; 
    name: string; 
    username: string; 
    email: string;
    payment: string;
    address: string[];
    phone: string;
    code: string;
  }) {
    super(id);
    this.CPF = CPF;
    this.name = name;
    this.username = username;
    this.email =email;
    this.payment = payment;
    this.address = address;
    this.phone = phone;
    this.code = code;
  }
}

export default UserModel;
