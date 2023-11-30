import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
import { Middleware } from '../middlewares/validationMiddleware';

export class UserController {
  private _middleware: Middleware;
  private _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
    this._middleware = new Middleware();
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        res.status(400).json({ ValidationErrors: middlewareError });
        return;
      }

      const newUser = req.body;
      await this._userService.createUser(newUser);
      res.status(200).send('User added successfully');
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(409).send('User/Email already exists');
      } else {
        res.status(500).send('Internal error');
      }
    }
  }

  public getValidationRules() {
    return this._middleware.getValidationRules;
  }
}
