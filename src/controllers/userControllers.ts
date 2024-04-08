import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
import { UserValidationMiddleware } from '../middlewares/validation/user/userValidationMiddleware';
import bcrypt from 'bcrypt';
import { JWTGenerator } from '../shared/jwtService';

export class UserController {
  private _middleware: UserValidationMiddleware;
  private _userService: UserService;
  private _jwtGenerator: JWTGenerator;

  constructor(userService: UserService) {
    this._userService = userService;
    this._middleware = new UserValidationMiddleware();
    this._jwtGenerator = new JWTGenerator();
  }

  public createUser = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const newUser = req.body;
      const user = await this._userService.createUser(newUser);
      return res.status(200).json({
        response: { default: 'User added successfully' },
      });
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(409).json({
          response: { default: 'User/password/email already exists' },
        });
      } else {
        return res.status(500).json({
          errors: { default: 'Internal server errorr' },
        });
      }
    }
  };

  public verifyUser = async (req: Request, res: Response) => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const { email, password } = req.body;
      const user = await this._userService.getUserbyEmail(email);
      const userId = user?._id.toString()
      const passwordIsValid = user
        ? await bcrypt.compare(password, user.password)
        : false;

      if (!passwordIsValid) {
        return res.status(401).json({
          response: { default: 'Invalid email / password' },
        });
      } else {

        const accessToken = this._jwtGenerator.sign({ uid: userId });

        const refreshToken = this._jwtGenerator.signRefresh({ uid: userId })

        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
          return res.status(500).json({
            response: {
              default:
                'Internal server error error while generating accessToken',
            },
          });
        }
        return res
          .cookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .status(200)
          .json({ accessToken, userId: user?._id, userName: user?.userName });
      }
    } catch (error) {
      return res.status(500).json({
        error: { default: 'Internal server error' },
      });
    }
  };

  public refreshToken = async (req: Request, res: Response) => {

    const refreshTokenCookie = req.cookies['refreshToken']
    try {

      const result = await this._jwtGenerator.verify(refreshTokenCookie);

      if (typeof result === 'object' && result !== null && 'uid' in result) {
       
        var uid = result.uid; 
      } else {

        console.error(result);
      }

    const newToken = await this._jwtGenerator.sign({
      uid: uid
    })

    const refreshToken = await this._jwtGenerator.signRefresh({
      uid: uid
    });

    res
      .cookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
      })
      .status(200).json({ token: newToken });

  } catch(error) {
    console.error(error);
    res.status(401).send('Invalid or expired token');
  }
}

  public getAll = async (req: Request, res: Response) => {
  try {
    const offset: number = Number(req.query.offset);
    const limit: number = Number(req.query.limit);
    const allUsers = await this._userService.getUsers(limit, offset);
    return res.status(200).json({ data: allUsers });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: { default: 'Internal server error' },
    });
  }
};

  public getUserbyId = async (req: Request, res: Response) => {
  try {
    const middlewareError = this._middleware.validateRequest(req, res);
    if (middlewareError) {
      return res.status(400).json({ ValidationErrors: middlewareError });
    }
    const userId = req.params.userId;
    const user = await this._userService.getUserbyId(userId);
    return res.status(200).json({ data: user });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: { default: 'Internal server error' },
    });
  }
};

  public changeUserData = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const middlewareError = this._middleware.validateRequest(req, res);
    if (middlewareError) {
      return res.status(400).json({ ValidationErrors: middlewareError });
    }
    const bodyLength = Object.keys(req.body).length;
    if (bodyLength === 0) {
      return res.status(400).json({
        response: {
          default: `Request was made, but since you haven't inserted properties to be changed, it didn't changed nothing.`,
        },
      });
    };

    const userId = req.params.userId;
    const userNewData = req.body;
    const user = await this._userService.changeUserData(
      userId,
      userNewData
    );

    return res.status(200).json({
      response: {
        default: `User data was updated, to check :http://localhost:8000/user/${userId}`,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({
        response: { default: 'Email already being used' },
      })
    }
    else if (error.kind === "ObjectId") {
      return res.status(404).json({
        errors: { default: 'UserId  not found' },
      });
    }
    else {
      return res.status(500).json({
        errors: { default: 'Internal server errorr' },
      });
    }
  }
};

  public deleteUserbyId = async (req: Request, res: Response) => {
  try {
    const middlewareError = this._middleware.validateRequest(req, res);
    if (middlewareError) {
      return res.status(400).json({ ValidationErrors: middlewareError });
    }
    const userId = req.params.userId;
    const user = await this._userService.deleteUserbyId(userId);
    return res
      .status(200)
      .json({
        message: `User ${user?.userName} id:${user?._id} was deleted`,
      });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: { default: 'Internal server error' },
    });
  }
};

  public getValidationRules = () => {
  return this._middleware.getValidationRules;
};

  public getChangeUserValidationRules = () => {
  return this._middleware.getChangeUserValidationRules;
};

  public getUserIdValidationRules = () => {
  return this._middleware.getUserIdValidationRules;
};

  public getSignInValidationRules = () => {
  return this._middleware.getSignInValidationRules;
};
}
