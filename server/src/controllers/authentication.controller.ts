import { Router } from 'express';
import AuthenticationService from '../services/authentication.service';

class AuthenticationController {
  private prefix: string = '/authentication';
  public router: Router;
  private authenticationService: AuthenticationService;

  constructor(router: Router, authenticationService: AuthenticationService) {
    this.router = router;
    this.authenticationService = authenticationService;
    this.initRoutes();
  }

  private initRoutes() {}
}

export default AuthenticationController;
