import { Router, Request, Response} from 'express';
import UserEntity from '../entities/user.entity';
import AuthenticationService from '../services/authentication.service';
import { Result, SuccessResult } from '../utils/result';

class AuthenticationController {
  private prefix: string = '/authentication';
  public router: Router;
  private authenticationService: AuthenticationService;

  constructor(router: Router, authenticationService: AuthenticationService) {
    this.router = router;
    this.authenticationService = authenticationService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.prefix}/sign-in`, (req: Request, res: Response) =>
      this.signIn(req, res)
    );
    
    this.router.post(`${this.prefix}/sign-up`, (req: Request, res: Response) =>
      this.signUp(req, res)
    );

    this.router.post(`${this.prefix}/sign-up/validation`, (req: Request, res: Response) =>
      this.signUpValidation(req, res)
    );

    this.router.post(`${this.prefix}/sign-up/recover-password`, (req: Request, res: Response) =>
      this.recoverPassword(req, res)
    );

    this.router.post(`${this.prefix}/sign-up/recover-password/code`, (req: Request, res: Response) =>
      this.recoverPasswordCode(req, res)
    );

    this.router.put(`${this.prefix}/sign-up/recover-password/reset`, (req: Request, res: Response) =>
      this.resetPassword(req, res)
    );
  }

  private async signIn(req: Request, res: Response) : Promise<Response> {
    let user = await this.authenticationService.signIn(new UserEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: user
    }).handleSuccess(res);
  }

  private async signUp(req: Request, res: Response) : Promise<Response> {
    await this.authenticationService.signUp(new UserEntity(req.body));
    
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req)
    }).handleSuccess(res);
  }

  private async signUpValidation(req: Request, res: Response) : Promise<Response> {
    await this.authenticationService.signUpValidation(new UserEntity(req.body));
    
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req)
    }).handleSuccess(res);
  }

  private async recoverPassword(req: Request, res: Response) : Promise<Response> {
    await this.authenticationService.recoverPassword(req.body.email);
    
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req)
    }).handleSuccess(res);
  }

  private async recoverPasswordCode(req: Request, res: Response) : Promise<Response> {
    await this.authenticationService.recoverPasswordCode(req.body.email, req.body.code);
    
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req)
    }).handleSuccess(res);
  }

  private async resetPassword(req: Request, res: Response) : Promise<Response> {
    await this.authenticationService.resetPassword(req.body.email, req.body.password);
    
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req)
    }).handleSuccess(res);
  }
}

export default AuthenticationController;
