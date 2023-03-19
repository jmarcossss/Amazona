import UserRepository from '../repositories/user.repository';

class AuthenticationServiceMessageCode {}

class AuthenticationService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
}

export default AuthenticationService;
