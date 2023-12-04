import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
import { ValidationMiddleware } from '../middlewares/validation/validationMiddleware';
import bcrypt from 'bcrypt';
import { JWTGenerator } from '../services/JWTService';

export class UserController {
  private _middleware: ValidationMiddleware;
  private _userService: UserService;
  private _jwtGenerator:JWTGenerator;

  constructor(userService: UserService) {
    this._userService = userService;
    this._middleware = new ValidationMiddleware();
    this._jwtGenerator = new JWTGenerator();
  }

  public createUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const newUser = req.body;
      await this._userService.createUser(newUser);
      return res.status(200).json({
        response: { default: "User added successfully" }
      });
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(409).json({
          response: { default: "User/password/email already exists" }
        })
      }
      else {
        return res.status(500).json({
          errors: { default: "Internal server errorr" }
        })
      }
    }
  }

  public verifyUser = async (req: Request, res: Response) => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const { email, password } = req.body;
      const user = await this._userService.getUserbyEmail(email);
      const passwordIsValid = user ? await bcrypt.compare(password, user.password) : false;

      if (!passwordIsValid) {
        return res.status(401).json({
          response: { default: "Invalid email / password" }
        });
      } else {
        const accessToken =this._jwtGenerator.sign({ uid: user?._id });

        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
          return res.status(500).json({
            response: { default: "Internal server error error while generating accessToken" }
          })
        }
        return res.status(200).json({ accessToken });
      }

    } catch (error) {
      return res.status(500).json({
        error: { default: "Internal server error" }
      });
    }

  }
  public getAll = async (req: Request, res: Response) => {
    try {
      const allUsers = await this._userService.getUsers();
      return res.status(200).json({data:allUsers});
    } catch (error: any) {
      console.log(error)
      res.status(500).json({
        error: { default: "Internal server error" }
      });
    }
  }

  public getValidationRules = () => {
    return this._middleware.getValidationRules;
  }

  public getSignInValidationRules = () => {
    return this._middleware.getSignInValidationRules;
  }
}
