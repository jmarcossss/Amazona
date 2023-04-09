import { Router, Request, Response } from 'express';
import UserService from '../services/user.service';
import { Result, SuccessResult } from '../utils/result';
import UserEntity from '../entities/user.entity';
import UserModel from '../models/user.model';

class UserController {
  private prefix: string = '/users';
  public router: Router;
  private userService: UserService;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getUsers(req, res)
    );
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getUserById(req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateUserById(req, res)
    );
    this.router.post(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deleteUserById(req, res)
    );
  }

  private async getUsers(req: Request, res: Response) {
    let users = await this.userService.getUsers();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: users,
    }).handleSuccess(res);
  }

  private async getUserById(req: Request, res: Response) {
    let user = new UserModel(await this.userService.
                                   getUserById(req.params.id));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: user,
    }).handleSuccess(res);
  }

  private async deleteUserById(req: Request, res: Response) {
    await this.userService.deleteUserById(req.params.id, 
                                          req.body.password);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req)
    }).handleSuccess(res);
  }
  
  private async updateUserById(req: Request, res: Response) {
    await this.userService.updateUserById(req.params.id, 
                                          new UserEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handleSuccess(res);
  }
}

export default UserController;