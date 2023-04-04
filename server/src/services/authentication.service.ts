import UserEntity from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';
import { BadRequestError, NotFoundError, InternalServerError} from '../utils/errors/http.error';
import UserService from './user.service';

class AuthenticationServiceMessageCode {
  public static readonly incorrect_credentials = 'incorrect_credentials';
  public static readonly incorrect_password = 'incorrect_password';
  public static readonly already_registered = 'already_registered';
  public static readonly email_unavailable = 'email_unavailable';
  public static readonly username_unavailable = 'username_unavailable';
  public static readonly email_invalid_format = 'email_invalid_format';
  public static readonly password_invalid_format = 'password_invalid_format';
  public static readonly CPF_invalid_format = 'CPF_invalid_format';
  public static readonly sign_up_error = 'sing_up_error';
  public static readonly reset_password_error = 'reset_password_error';
  public static readonly incorrect_recovery_code = 'incorrect_recovery_code';
}

class AuthenticationService {
  private userService: UserService;
  private userRepository: UserRepository;
  private pattern: RegExp;

  constructor(userService: UserService, userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userService = userService;
    this.pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  public async signIn(data: UserEntity): Promise<UserEntity | undefined> {
    try {
      const users = await this.userRepository.getUsers();
      const user = users.find((user) => ( user.email === data.email) || 
                                          user.username === data.username);

      if(!user){
        throw new NotFoundError({
          msg: 'User not found!',
          msgCode: AuthenticationServiceMessageCode.incorrect_credentials,
        });
      }

      if(data.password != user.password){
        throw new BadRequestError({
          msg: 'Incorrect password!',
          msgCode: AuthenticationServiceMessageCode.incorrect_password,
        });
      }

      return user;
      
    } catch (e) {
      throw e;
    }
  }

  public async signUpValidation(data: UserEntity): Promise<string[]> {
    let code:string[] = [];

    try {
      if(/[a-zA-Z]/.test(data.CPF) || data.CPF.length != 11) {
        code.push(AuthenticationServiceMessageCode.
                  CPF_invalid_format);
      }

      if(!this.pattern.test(data.email)){
        code.push(AuthenticationServiceMessageCode.
                  email_invalid_format)
      }

      if (!(/\d/.test(data.password) && 
          /[a-zA-Z]/.test(data.password)) &&  
          data.password.length != 8) {
        code.push(AuthenticationServiceMessageCode.
                  password_invalid_format)
      }

      const users = await this.userRepository.getUsers();
      if(users.some((user) => user.CPF == data.CPF)){
        code.push(AuthenticationServiceMessageCode.
                  already_registered);
      }

      if(users.some((user) => user.email == data.email)){
        code.push(AuthenticationServiceMessageCode.
                  email_unavailable)
      }

      if(users.some((user) => user.username == data.username)){
        code.push(AuthenticationServiceMessageCode.
                  username_unavailable);
      }

      return code;
    } catch(e) {
      throw e;
    }
  }

  public async signUp(data: UserEntity): Promise<string | string[]> {
    try {
      let error =  await this.signUpValidation(data);

      if(!error.length) {
        const user = await this.userRepository.signUp(data);

        if(!user) {
          throw new BadRequestError({
            msg: 'Error in signing up!',
            msgCode: AuthenticationServiceMessageCode.sign_up_error,
          });
        }
      }
     
      return error;
    } catch(e) {
      throw e;
    }
  }

  public async recoverPassword(email: string): Promise<void> {
    try {
      const user = await this.userService.getUserByEmail(email);

      const code = String(Math.floor(Math.random()));
      user.code = '1111'
      await this.userService.updateUserById(user.id, user);

      //TODO: send email.
    } catch(e) {
      throw e;
    }
  }

  public async recoverPasswordCode(email: string, code: string): Promise<void> {
    try {
      const user = await this.userService.getUserByEmail(email);

      if(user.code != code) {
        throw new BadRequestError({
          msg: 'Incorrect recovery code!',
          msgCode: AuthenticationServiceMessageCode.incorrect_recovery_code,
        });
      }

      user.code = ''
      await this.userService.updateUserById(user.id, user);

    } catch(e) {
      throw e;
    }
  }

  public async resetPassword(data: UserEntity): Promise<void> {
    try {
      if (!(/\d/.test(data.password) && 
          /[a-zA-Z]/.test(data.password)) &&  
          data.password.length != 8) {
        throw new BadRequestError({ msg: 'Invalid password format!',
                                    msgCode: AuthenticationServiceMessageCode.
                                             password_invalid_format})
      }

      const user = await this.userService.getUserByEmail(data.email)
      
      data.id = user.id
      await this.userService.updateUserById(data.id, data)
    } catch (e) {
      throw e;
    }
  }
}

export default AuthenticationService;
