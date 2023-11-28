import { Request, Response } from 'express';
import { userService } from '../services/userServices';
import { Middleware } from '../middlewares/validationMiddleware';

export class UserController {
  private _middleware: Middleware;
  private _userService: userService;

  constructor(private userService: userService) {
    this._userService = userService;
    this._middleware = new Middleware();
  }


  public async createUser(req: Request, res: Response): Promise<any> {

    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        res.status(400).json({ ValidationErrors: middlewareError})
      } else {
        const newUser = req.body;
        await this.userService.createUser(newUser);
        res.status(200).send('User added successfully');
      }    
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(409).send('User/Email already exists');
      }
      else {
        return res.status(500).send('Internal error')
      }
    }
  }
  public getValidationRules() {
    return this._middleware.getValidationRules
  }
}
