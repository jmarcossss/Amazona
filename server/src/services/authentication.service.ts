import UserEntity from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';
import { BadRequestError, NotFoundError} from '../utils/errors/http.error';

class AuthenticationServiceMessageCode {
  public static readonly incorrect_credentials = 'incorrect_credentials';
  public static readonly incorrect_password = 'incorrect_password';
  public static readonly already_registered = 'already_registered';
  public static readonly email_unavailable = 'email_unavailable';
  public static readonly username_unavailable = 'username_unavailable';
  public static readonly email_invalid_format = 'email_invalid_format';
  public static readonly password_invalid_format = 'password_invalid_format';
  public static readonly CPF_invalid_format = 'password_invalid_format';
  public static readonly sign_up_error = 'sing_up_error';
}

class AuthenticationService {
  private userRepository: UserRepository;
  private pattern: RegExp;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  public async signIn(data: UserEntity): Promise<UserEntity | undefined> {
    try {
      console.log(data);
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

  private async signUpValidation(data: UserEntity): Promise<void> {
    try {
      if(/[a-zA-Z]/.test(data.CPF)) {
        throw new BadRequestError({
          msg: 'CPF invalid format!',
          msgCode: AuthenticationServiceMessageCode.password_invalid_format
        });
      }

      if(!this.pattern.test(data.email)){
        throw new BadRequestError({
          msg: 'Invalid email format!',
          msgCode: AuthenticationServiceMessageCode.email_invalid_format
        });
      }

      if (!(/\d/.test(data.password) && 
          /[a-zA-Z]/.test(data.password)) &&  
          data.password.length != 8) {
        throw new BadRequestError({
          msg: 'Invalid password format!',
          msgCode: AuthenticationServiceMessageCode.password_invalid_format
        });
      }

      const users = await this.userRepository.getUsers();
      if(users.some((user) => user.CPF == data.CPF)){
        throw new BadRequestError({
          msg: 'User already registered!',
          msgCode: AuthenticationServiceMessageCode.already_registered
        });
      }

      if(users.some((user) => user.email == data.email)){
        throw new BadRequestError({
          msg: 'Email already been used!',
          msgCode: AuthenticationServiceMessageCode.email_unavailable
        });
      }

      if(users.some((user) => user.username == data.username)){
        throw new BadRequestError({
          msg: 'Username already been used!',
          msgCode: AuthenticationServiceMessageCode.username_unavailable
        });
      }

    } catch(e) {
      throw e;
    }
  }

  public async signUp(data: UserEntity): Promise<void> {
    try {
      await this.signUpValidation(data);
      const user = await this.userRepository.signUp(data);

      if(!user) {
        throw new BadRequestError({
          msg: 'Error in signing up!',
          msgCode: AuthenticationServiceMessageCode.sign_up_error,
        });
      }

    } catch(e) {
      throw e;
    }
  }
}

export default AuthenticationService;
