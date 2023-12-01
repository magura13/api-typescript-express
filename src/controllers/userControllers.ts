import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
import { Middleware } from '../middlewares/validationMiddleware';
import bcrypt from 'bcrypt';

export class UserController {
  private _middleware: Middleware;
  private _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
    this._middleware = new Middleware();
  }

  public createUser = async (req: Request, res: Response): Promise<void> => {
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

  public verifyUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this._userService.getUserbyEmail(email);
    
    if (result instanceof Error) {
      return res.status(500).send("Invalid email/password");
    }

    const passwordIsValid = result ? await bcrypt.compare(password, result.password) : false;

    if (!passwordIsValid) {
      return res.status(401).send("Invalid email/password"); 
    } else {
      return res.status(200).json({ accessToken: "teste.teste.teste" });
    }
}
  public  getAll = async (req: Request, res: Response) => {
    try {
      const allUsers = await this._userService.getUsers();
      return res.status(400).send(allUsers);
    } catch (error: any) {
      console.log(error)
      res.status(500).send('Internal error');
    }
  }

  public getValidationRules = () => {
    return this._middleware.getValidationRules;
  }

  public getSignInValidationRules = () => {
    return this._middleware.getSignInValidationRules;
  }
}
