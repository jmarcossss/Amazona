import BaseEntity from './base.entity';

export default class UserEntity extends BaseEntity {
    CPF: string;
    name: string;
    username: string;
    email: string;
    password: string; 
    payment: string;
    address: string[];
    phone: string;
    code: string;

    constructor(data: Partial<UserEntity>){
        super(data.id || '');
        this.CPF = data.CPF || '';
        this.name = data.name || '';
        this.username = data.username || '';
        this.email = data.email || '';
        this.password = data.password || '';
        this.payment = data.payment || '';
        this.address = data.address || [];
        this.phone = data.phone || '';
        this.code = data.code || '';
    }
}