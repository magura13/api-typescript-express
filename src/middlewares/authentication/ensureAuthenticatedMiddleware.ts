import { NextFunction, Request, Response } from 'express';
import { JWTGenerator } from '../../shared/jwtService';

export class EnsureAuthenticatedMiddleware {
  private _jwt: JWTGenerator;

  constructor() {
    this._jwt = new JWTGenerator();
  }

  public ensureAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        errors: { default: 'Not Authenticated' },
      });
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      return res.status(401).json({
        errors: { default: 'Not Authenticated' },
      });
    }

    const jwtData = this._jwt.verify(token);

    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
      return res.status(500).json({
        errors: { default: 'Error while verifying token' },
      });
    } else if (jwtData === 'INVALID_TOKEN') {
      return res.status(401).json({
        errors: { default: 'Not Authenticated' },
      });
    }

    req.headers.userId = jwtData.uid.toString();

    return next();
  };
}
